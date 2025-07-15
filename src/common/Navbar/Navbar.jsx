import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Path from '../Path';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isHome = location.pathname === Path.home; // e.g., "/"

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token && token !== 'undefined' && token !== 'null');
  }, [location.pathname]);

  const handleUserClick = () => {
    navigate(isLoggedIn ? "/userprofile" : "/login");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => {
        setIsSticky(window.scrollY > 50); // detect small scroll
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsSticky(true); // Other pages always sticky
    }
  }, [location.pathname]);

  const headerClass = `w-full z-50 transition-all duration-300 backdrop-blur ${
    isSticky
      ? 'fixed top-0 left-0 bg-black/90 shadow-lg'
      : isHome
      ? 'absolute top-0 left-0 bg-transparent'
      : 'fixed top-0 left-0 bg-black/90 shadow-lg'
  }`;

  return (
    <div className={headerClass}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:py-2">
          <div className="flex items-center gap-2">
            <img
              src="/assets/Logo/Kensdrive logo.png"
              alt="KensDrive Logo"
              className="w-20 h-auto"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block bg-[#18181b] rounded-lg px-4 py-2">
            <div className="flex gap-2">
              {[
                { path: Path.home, label: 'Home' },
                { path: Path.movie, label: 'Movies' },
                { path: Path.supports, label: 'Supports' },
                { path: Path.subscription, label: 'Subscription' },
                { path: '/video-upload', label: 'Video Upload' }
              ].map(({ path, label }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    location.pathname === path ? 'bg-black text-white' : 'bg-[#18181b] text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <button className="p-2 rounded-full hover:bg-gray-800 transition" onClick={handleUserClick}>
                  <AccountCircleIcon className="text-gray-200" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition" onClick={handleLogout}>
                  <LogoutIcon className="text-gray-200" />
                </button>
              </>
            ) : (
              <button className="p-2 rounded-full hover:bg-gray-800 transition" onClick={handleUserClick}>
                <LoginIcon className="text-gray-200" />
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden block">
            <button className="p-2 rounded-full hover:bg-gray-800 transition" onClick={() => setOpen(!open)}>
              <SegmentOutlinedIcon className="text-gray-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between animate-fade-in">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h5 className="text-lg font-semibold text-white">Menu</h5>
            <button type="button" className="text-gray-400 hover:text-white text-2xl" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="p-6 flex flex-col gap-2">
              {[
                { path: Path.home, label: 'Home' },
                { path: Path.movie, label: 'Movies' },
                { path: Path.supports, label: 'Supports' },
                { path: Path.subscription, label: 'Subscription' },
                { path: '/video-upload', label: 'Video Upload' }
              ].map(({ path, label }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                    location.pathname === path ? 'bg-gray-900 text-white' : 'bg-[#18181b] text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition mt-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <LogoutIcon className="text-white" /> Logout
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full text-left px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition mt-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <LoginIcon className="text-white" /> Login
                  </span>
                </button>
              )}
            </div>
            <div className="flex justify-center gap-4 pb-6">
              <button className="p-2 rounded-full hover:bg-gray-800 transition">
                <SearchIcon className="text-gray-200" />
              </button>
              {isLoggedIn && (
                <button className="p-2 rounded-full hover:bg-gray-800 transition">
                  <NotificationsNoneOutlinedIcon className="text-gray-200" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
