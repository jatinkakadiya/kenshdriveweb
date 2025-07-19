import React, { useRef, useState } from 'react';
import { FaLock, FaExpand, FaCompress } from 'react-icons/fa';
import { FaUnlock } from "react-icons/fa6";
import { useParams } from 'react-router-dom';


export default function MovieDetailsScreen() {
  const [locked, setLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
const url = useParams()
console.log(url)
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

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative w-[100%] h-screen overflow-hidden bg-black flex flex-col justify-center items-center"
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
          controlsList="nofullscreen"
          // style={{ minHeight: '100vh', minWidth: '100vw', background: 'black' }}
        />
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