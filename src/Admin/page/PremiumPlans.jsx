import React, { useState } from 'react';

// Static premium plans data for testing
const staticPlans = [
  {
    _id: '1',
    name: 'Monthly',
    price: 199,
    durationInDays: 30,
    features: {
      fullMovieAccess: true,
      adFree: true,
      hdStreaming: true,
      earlyAccess: false,
      downloadsAllowed: false,
      maxDevices: 1,
    },
    isActive: true,
    createdAt: new Date('2023-12-01')
  },
  {
    _id: '2',
    name: 'Yearly',
    price: 1999,
    durationInDays: 365,
    features: {
      fullMovieAccess: true,
      adFree: true,
      hdStreaming: true,
      earlyAccess: true,
      downloadsAllowed: true,
      maxDevices: 3,
    },
    isActive: true,
    createdAt: new Date('2023-12-01')
  },
  {
    _id: '3',
    name: 'Ultimate',
    price: 2999,
    durationInDays: 365,
    features: {
      fullMovieAccess: true,
      adFree: true,
      hdStreaming: true,
      earlyAccess: true,
      downloadsAllowed: true,
      maxDevices: 5,
    },
    isActive: true,
    createdAt: new Date('2023-12-01')
  }
];

const PremiumPlans = () => {
  const [plans, setPlans] = useState(staticPlans);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    durationInDays: '',
    features: {
      fullMovieAccess: false,
      adFree: false,
      hdStreaming: false,
      earlyAccess: false,
      downloadsAllowed: false,
      maxDevices: 1,
    },
    isActive: true
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('features.')) {
      const featureName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureName]: type === 'checkbox' ? checked : parseInt(value) || 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Plan name is required';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.durationInDays || formData.durationInDays <= 0) {
      newErrors.durationInDays = 'Valid duration is required';
    }
    if (formData.features.maxDevices <= 0) {
      newErrors.maxDevices = 'At least 1 device must be allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan._id === editingPlan._id 
          ? { ...formData, _id: plan._id, createdAt: plan.createdAt }
          : plan
      ));
      setEditingPlan(null);
    } else {
      // Add new plan
      const newPlan = {
        ...formData,
        _id: 'p' + (plans.length + 1),
        createdAt: new Date()
      };
      setPlans([...plans, newPlan]);
    }

    // Reset form
    setFormData({
      name: '',
      price: '',
      durationInDays: '',
      features: {
        fullMovieAccess: false,
        adFree: false,
        hdStreaming: false,
        earlyAccess: false,
        downloadsAllowed: false,
        maxDevices: 1,
      },
      isActive: true
    });
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      durationInDays: plan.durationInDays,
      features: { ...plan.features },
      isActive: plan.isActive
    });
  };

  const handleToggleActive = (planId) => {
    setPlans(plans.map(plan =>
      plan._id === planId
        ? { ...plan, isActive: !plan.isActive }
        : plan
    ));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-red-900 to-black py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Form Section */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg shadow-xl p-6 text-white border border-red-500/30 mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-6">
            {editingPlan ? 'Edit Premium Plan' : 'Add Premium Plan'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Plan Name <span className="text-red-500">*</span>
                </label>
                <select
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-black border ${errors.name ? 'border-red-500' : 'border-red-500/50'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                >
                  <option value="" className="bg-black text-white">Select Plan</option>
                  <option value="Monthly" className="bg-black text-white">Monthly</option>
                  <option value="Yearly" className="bg-black text-white">Yearly</option>
                  <option value="Ultimate" className="bg-black text-white">Ultimate</option>
                </select>
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${errors.price ? 'border-red-500' : 'border-red-500/50'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Enter price"
                />
                {errors.price && <p className="mt-1 text-red-500 text-sm">{errors.price}</p>}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Duration (Days) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="durationInDays"
                  value={formData.durationInDays}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${errors.durationInDays ? 'border-red-500' : 'border-red-500/50'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="Enter duration in days"
                />
                {errors.durationInDays && <p className="mt-1 text-red-500 text-sm">{errors.durationInDays}</p>}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-white">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="features.fullMovieAccess"
                    checked={formData.features.fullMovieAccess}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-red-500/50 rounded bg-black/50"
                  />
                  <span className="text-white">Full Movie Access</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="features.adFree"
                    checked={formData.features.adFree}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-red-500/50 rounded bg-black/50"
                  />
                  <span className="text-white">Ad Free</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="features.hdStreaming"
                    checked={formData.features.hdStreaming}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-red-500/50 rounded bg-black/50"
                  />
                  <span className="text-white">HD Streaming</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="features.earlyAccess"
                    checked={formData.features.earlyAccess}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-red-500/50 rounded bg-black/50"
                  />
                  <span className="text-white">Early Access</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="features.downloadsAllowed"
                    checked={formData.features.downloadsAllowed}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-red-500/50 rounded bg-black/50"
                  />
                  <span className="text-white">Downloads Allowed</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Max Devices
                  </label>
                  <input
                    type="number"
                    name="features.maxDevices"
                    value={formData.features.maxDevices}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-4 py-2 bg-[linear-gradient(to_right,rgba(31,41,55,0.8),rgba(185,28,28,0.2))] border ${errors.maxDevices ? 'border-red-500' : 'border-red-500/50'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
                  />
                  {errors.maxDevices && <p className="mt-1 text-red-500 text-sm">{errors.maxDevices}</p>}
                </div>
              </div>
            </div>

            {/* Active Status */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 text-red-600 focus:ring-red-500 border-red-500/50 rounded bg-black/50"
                />
                <span className="text-white">Active Plan</span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800 text-white py-3 px-4 rounded-md hover:from-red-700 hover:via-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {editingPlan ? 'Update Plan' : 'Add Plan'}
              </button>
            </div>
          </form>
        </div>

        {/* Plans List */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg shadow-xl p-6 text-white border border-red-500/30">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300 mb-6">
            Premium Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div
                key={plan._id}
                className={`relative rounded-lg overflow-hidden transition-all duration-300 ${plan.isActive ? 'bg-gray-800/50' : 'bg-gray-800/20'}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                      <p className="text-2xl font-bold text-red-500">₹{plan.price}</p>
                      <p className="text-sm text-gray-400">{plan.durationInDays} days</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleToggleActive(plan._id)}
                        className={`p-2 ${plan.isActive ? 'bg-green-500/20 hover:bg-green-500/40' : 'bg-gray-500/20 hover:bg-gray-500/40'} rounded-full`}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plan.features.fullMovieAccess && (
                      <p className="text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Full Movie Access
                      </p>
                    )}
                    {plan.features.adFree && (
                      <p className="text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Ad Free
                      </p>
                    )}
                    {plan.features.hdStreaming && (
                      <p className="text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        HD Streaming
                      </p>
                    )}
                    {plan.features.earlyAccess && (
                      <p className="text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Early Access
                      </p>
                    )}
                    {plan.features.downloadsAllowed && (
                      <p className="text-sm text-gray-300 flex items-center">
                        <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Downloads Allowed
                      </p>
                    )}
                    <p className="text-sm text-gray-300 flex items-center">
                      <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {plan.features.maxDevices} {plan.features.maxDevices === 1 ? 'Device' : 'Devices'}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      Created: {new Date(plan.createdAt).toLocaleDateString()}
                    </p>
                    <p className={`text-xs ${plan.isActive ? 'text-green-500' : 'text-gray-500'}`}>
                      Status: {plan.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans; 