import React, { useRef, useState } from 'react';
import { FaLock, FaExpand, FaCompress } from 'react-icons/fa';
import { FaUnlock } from "react-icons/fa6";
import { useParams, useNavigate } from 'react-router-dom';


export default function MovieDetailsScreen() {
  const [locked, setLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
const url = useParams()
  // Dummy movie details for demonstration
  const movieDetails = {
    name: 'Movie Name',
    streamingUrl: 'https://videos.pexels.com/video-files/19022223/19022223-uhd_2560_1440_60fps.mp4',
  };

  // Get video URL from query param if present
  let videoUrl = movieDetails.streamingUrl;
  try {
    const params = new URLSearchParams(window.location.search);
    const videoParam = params.get('video');
    if (videoParam) {
      videoUrl = videoParam;
    }
  } catch {}

  // Fullscreen handlers
  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  React.useEffect(() => {
    // Premium check logic
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const user = JSON.parse(atob(token.split('.')[1]));
        setIsPremium(!!user.isPremium);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (!isPremium && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      const timer = setTimeout(() => {
        videoRef.current.pause();
        setShowPopup(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isPremium, videoUrl]);

  return (
    <div
      ref={containerRef}
      className=" relative w-[100%] h-screen overflow-hidden bg-black flex flex-col justify-center items-center"
      style={{ padding: 0, margin: 0 }}
    >
      {/* Movie Name */}
      {/* Video Player */}
      <div className="relative w-[100%] h-full flex justify-center items-center ">
            <video
              ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          controls={!locked}
              autoPlay
         controlsList={isPremium ? "nofullscreen download" : "nofullscreen nodownload"}
          // style={{ minHeight: '100vh', minWidth: '100vw', background: 'black' }}
        />
        {/* Popup for non-premium users after 15s */}
        {showPopup && !isPremium && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4 text-red-600">Upgrade Required</h2>
              <p className="mb-6 text-gray-800">This is a preview. Please upgrade to premium to watch the full video.</p>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold"
                onClick={() => {
                  setShowPopup(false);
                  navigate('/subscription');
                }}
              >
                Go to subscription
              </button>
            </div>
          </div>
        )}
        {/* Center Lock Button (only when locked) */}
        {locked && (
          <button
            onClick={() => setLocked(false)}
            className="absolute z-40 flex items-center justify-center  top-[80%] left-[1%] bg-black/70 text-white p-2 rounded-full hover:bg-black/90 focus:outline-none"
            style={{
              // top: '90%',
              // left: '3%',
              // transform: 'translate(-20%, -20%)',
             
              cursor: 'pointer',
            }}
            title="Unlock"
          >
            {/* <FaUnlock size={20} color="green" /> */}
            <FaLock size={20} color="white" />
          </button>
        )}
        {/* Fullscreen Button (top right) */}
        <button
          onClick={handleFullscreen}
          
          className="absolute top-[80%] left-16 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 focus:outline-none z-10"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
        </button>
        {/* Lock Button (top right, only when unlocked) */}
        {!locked && (
          <button
          onClick={() => setLocked(true)}
          className="absolute top-[80%] left-[1%] bg-black/70 text-white p-2 rounded-full hover:bg-black/90 focus:outline-none z-10"
          title="Lock"
          >
          <FaUnlock size={20} color="silver" />
          </button>
        )}
        {/* Overlay to block interaction when locked */}
        {locked && (
          <div
            className="absolute inset-0 z-30"
            style={{ pointerEvents: 'auto', background: 'transparent' }}
            onClick={e => e.stopPropagation()}
          ></div>
        )}
      </div>
    </div>
  );
} 