import React, { useState } from 'react';

// Static orders data for testing
const staticOrders = [
  {
    _id: '1',
    userid: {
      _id: 'u1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    premiumType: 'monthly',
    price: 199,
    paymentStatus: 'completed',
    paymentId: 'pay_123456',
    createdAt: new Date('2024-03-15'),
    expiresAt: new Date('2024-04-15')
  },
  {
    _id: '2',
    userid: {
      _id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    premiumType: 'yearly',
    price: 1999,
    paymentStatus: 'pending',
    paymentId: 'pay_789012',
    createdAt: new Date('2024-03-14'),
    expiresAt: new Date('2025-03-14')
  },
  {
    _id: '3',
    userid: {
      _id: 'u3',
      name: 'Mike Johnson',
      email: 'mike@example.com'
    },
    premiumType: 'monthly',
    price: 199,
    paymentStatus: 'failed',
    paymentId: 'pay_345678',
    createdAt: new Date('2024-03-13'),
    expiresAt: new Date('2024-04-13')
  }
];

const Orders = () => {
  const [orders, setOrders] = useState(staticOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.userid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userid.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.paymentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-red-900 to-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg shadow-xl p-6 text-white border border-red-500/30">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-6">
            Orders Management
          </h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email or payment ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-red-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-2 bg-black border border-red-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all" className="bg-black">All Status</option>
                <option value="completed" className="bg-black">Completed</option>
                <option value="pending" className="bg-black">Pending</option>
                <option value="failed" className="bg-black">Failed</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-red-500/30">
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Plan</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Payment ID</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-left">Expires</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr 
                    key={order._id}
                    className="border-b border-red-500/10 hover:bg-red-500/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{order.userid.name}</div>
                        <div className="text-sm text-gray-400">{order.userid.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{order.premiumType}</td>
                    <td className="px-4 py-3">₹{order.price}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono">{order.paymentId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)} bg-opacity-20 text-white`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.expiresAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No orders found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders; 