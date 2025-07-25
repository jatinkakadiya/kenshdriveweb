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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userInfo, setUserInfo] = useState(null);

  const isHome = location.pathname === Path.home; // e.g., "/"

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token && token !== 'undefined' && token !== 'null');
    const userStr = localStorage.getItem('userinfo');
    if (userStr) {
      try {
        setUserInfo(JSON.parse(userStr));
      } catch {
        setUserInfo(null);
      }
    } else {
      setUserInfo(null);
    }
  }, [location.pathname]);

  const handleUserClick = () => {
    navigate(isLoggedIn ? "/userprofile" : "/login");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('videoHistory');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

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
                 { path: Path.movie, label: 'Video player' },
                 // { path: Path.supports, label: 'Supports' },
                 { path: Path.subscription, label: 'More' },
                 { path: Path.history, label: 'Recent ' },
                // { path: '/video-upload', label: 'Video Upload' }
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

      {/* Drawer and Overlay only on mobile */}
      {open && isMobile && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 block`}
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-screen w-3/4 max-w-xs z-50 bg-black shadow-lg flex flex-col justify-between transform transition-transform duration-300 translate-x-0`}
            style={{ minWidth: '260px' }}
          >
          <div className="flex flex-col items-center justify-center px-6 py-4 border-b border-gray-800">
            <h5 className="text-lg font-semibold text-white w-full flex justify-between items-center">Menu
              <button type="button" className="text-gray-400 hover:text-white text-2xl" onClick={() => setOpen(false)}>
                ×
              </button>
            </h5>
            {isLoggedIn && userInfo && (
              <button
                className="w-full flex flex-col items-center mt-2 mb-2 p-2 bg-[#18181b] rounded-lg focus:outline-none hover:bg-gray-800 transition cursor-pointer"
                onClick={() => { setOpen(false); navigate('/userprofile'); }}
                type="button"
              >
                <AccountCircleIcon className="text-gray-300 text-4xl mb-1" style={{ fontSize: 40 }} />
                <span className="text-white font-medium text-base">{userInfo.name || userInfo.username || userInfo.email}</span>
                {userInfo.email && <span className="text-gray-400 text-xs">{userInfo.email}</span>}
              </button>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between bg-black">
            <div className="p-6 flex flex-col gap-2">
              {[
                { path: Path.home, label: 'Home' },
                { path: Path.movie, label: 'Video player' },
                // { path: Path.supports, label: 'Supports' },
                { path: Path.subscription, label: 'More' },
                { path: Path.history, label: 'Recent ' },
                // { path: '/video-upload', label: 'Video Upload' }
              ].map(({ path, label }) => (
                <button
                  key={label}
                    onClick={() => { setOpen(false); navigate(path); }}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                    location.pathname === path ? 'bg-gray-900 text-white' : 'bg-[#18181b] text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}

              {isLoggedIn ? (
                <button
                    onClick={() => { setOpen(false); handleLogout(); }}
                  className="w-full text-left px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition mt-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <LogoutIcon className="text-white" /> Logout
                  </span>
                </button>
              ) : (
                <button
                    onClick={() => { setOpen(false); navigate('/login'); }}
                  className="w-full text-left px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition mt-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <LoginIcon className="text-white" /> Login
                  </span>
                </button>
              )}
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
