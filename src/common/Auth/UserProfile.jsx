/* Full responsive version of your UserScreen.jsx */
// File: UserScreen.jsx

// ✅ This cleaned-up version includes:
// - Better responsive layout
// - Avatar, card, grid & text improvements
// - Improved mobile UI

// Please note: for brevity and clarity, only essential changes are highlighted.

import React, { useState, useRef, useEffect } from 'react';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  CreditCard as CreditCardIcon,
  Shield as ShieldIcon,
  PlayArrow as PlayArrowIcon,
  History as HistoryIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { Snackbar, Alert, Avatar, Divider } from '@mui/material';
import { Apihelper } from '../service/ApiHelper';

export default function UserScreen() {
  const [user, setUser] = useState({
    premiumType: 'yearly',
    autoplayControls: true,
    watchHistory: true,
    maturitySettings: 'All Maturity Ratings'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await Apihelper.userInfo(token);
      setUser(response.data.decode);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Apihelper.editUser(user, user._id);
    setIsEditing(false);
    fetchUser();
    setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Profile Section */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-40 sm:h-56 bg-gradient-to-r from-red-700 to-pink-600" />

          <div className="relative px-4 -mt-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar src={user.userimage} alt="Profile" className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-gray-900" />
                <div>
                  <h1 className="text-white text-xl sm:text-2xl font-bold">{user.name}</h1>
                  <p className={`mt-1 text-sm px-3 py-1 rounded-full inline-block ${user.isPremium ? 'bg-yellow-400 text-black' : 'bg-gray-600 text-white'}`}>
                    {user.isPremium ? 'Premium Member' : 'Free Member'}
                  </p>
                </div>
              </div>
             
            </div>
          </div>

          {/* Info Cards */}
          <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            {/* <InfoCard icon={<EmailIcon />} label="Email" value={user.email} /> */}
            <InfoCard icon={<CalendarIcon />} label="Member Since" value={new Date(user.createdAt).toLocaleDateString()} />
            <InfoCard icon={<StarIcon />} label="Status" value={user.isPremium ? `Premium until ${new Date(user.premiumExpiresAt).toLocaleDateString()}` : 'Free Account'} />
            {/* <InfoCard icon={<PhoneIcon />} label="Phone" value={user.phonenumber || 'Not provided'} /> */}
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Full Name" name="name" value={user.name} onChange={handleChange} icon={<PersonIcon />} />
              <InputField label="Email" name="email" value={user.email} onChange={handleChange} icon={<EmailIcon />} />
              <InputField label="Phone Number" name="phonenumber" value={user.phonenumber} onChange={handleChange} icon={<PhoneIcon />} />
              <div>
                <label className="block text-white mb-1">Language</label>
                <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
                  <LanguageIcon className="text-gray-400 mr-3" />
                  <select
                    name="language"
                    value={user.language || ''}
                    onChange={handleChange}
                    className="flex-1 bg-transparent text-white border-none focus:outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>
              <div className="col-span-full flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="border border-gray-600 px-4 py-2 rounded-lg text-white">Cancel</button>
                <button type="submit" className="bg-red-600 px-4 py-2 rounded-lg text-white">Save Changes</button>
              </div>
            </form>
          ) : (
            <div className="text-white grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={<EmailIcon />} label="Email" value={user.email} />
              <InfoCard icon={<PhoneIcon />} label="Phone" value={user.phonenumber || 'Not provided'} />
              <InfoCard icon={<LanguageIcon />} label="Language" value={user.language || 'English'} />
              <InfoCard icon={<CreditCardIcon />} label="Subscription" value={user.isPremium ? `${user.premiumType} Plan` : 'Free Plan'} />
            </div>
          )}
        </div>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} className="bg-gray-800 text-white">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

// Reusable Components
function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4">
      <div className="bg-red-600 bg-opacity-20 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white font-medium text-sm truncate">{value}</p>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, icon }) {
  return (
    <div>
      <label className="block text-white mb-1">{label}</label>
      <div className="flex items-center bg-gray-700 rounded-lg px-4 py-2">
        <div className="text-gray-400 mr-3">{icon}</div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent text-white border-none focus:outline-none"
        />
      </div>
    </div>
  );
}
