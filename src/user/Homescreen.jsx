import React, { useState, useRef } from 'react';

export default function HomeScreen() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const inputRef = useRef(null);

  const LOCAL_STORAGE_KEY = 'videoHistory';

  function addToHistory(entry) {
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    } catch {}
    history.unshift(entry);
    if (history.length > 20) history = history.slice(0, 20);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoURL(objectURL);
      setShowOverlay(true);
      addToHistory({
        type: 'file',
        name: file.name,
        url: objectURL,
        added: Date.now(),
      });
    }
  };

  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      setVideoFile(null);
      setVideoURL(urlInput.trim());
      setShowOverlay(true);
      addToHistory({
        type: 'url',
        url: urlInput.trim(),
        added: Date.now(),
      });
      setUrlInput('');
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setVideoFile(null);
    setVideoURL(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-6 px-2 sm:px-4 md:px-0 gap-6">
      {/* Local Video Gallery Card */}
      <div className="bg-[#18181b] rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">Play Local Video Files from Gallery</h2>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="hidden"
          ref={inputRef}
        />
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow transition mb-2 flex items-center justify-center gap-2"
          type="button"
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-9m0 0L8.25 7.5M12 7.5l3.75 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Open Gallery
        </button>
      </div>
      {/* Access File via Links Card */}
      <div className="bg-[#18181b] rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">Access File via Links</h2>
        <div className="flex w-full gap-2 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Paste video URL (mp4, webm, etc)"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-black text-white text-sm sm:text-base"
          />
          <button
            onClick={handleUrlAdd}
            className="w-full sm:w-auto px-4 py-2  bg-red-600 hover:bg-red-7000 text-white rounded-lg font-semibold text-sm sm:text-base mt-2 sm:mt-0 flex items-center justify-center gap-2"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75v10.5M6.75 12h10.5" />
            </svg>
            Add URL
          </button>
        </div>
      </div>
      {/* Fullscreen Video Overlay */}
      {showOverlay && videoURL && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button
            onClick={handleCloseOverlay}
            className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/60 rounded-full p-2  transition"
            title="Close"
          >
            &times;
          </button>
          <video
            src={videoURL}
            controls
            autoPlay
            className="w-full max-w-2xl max-h-[80vh] rounded-lg shadow-lg border border-gray-700"
            style={{ background: 'black' }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
