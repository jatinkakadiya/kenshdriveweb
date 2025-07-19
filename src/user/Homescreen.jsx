import React, { useState } from 'react';

export default function HomeScreen() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  const LOCAL_STORAGE_KEY = 'videoHistory';

  function addToHistory(entry) {
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    } catch {}
    history.unshift(entry); // add to start
    if (history.length > 20) history = history.slice(0, 20);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoURL(objectURL);
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
      addToHistory({
        type: 'url',
        url: urlInput.trim(),
        added: Date.now(),
      });
      setUrlInput('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-4 px-2 sm:px-4 md:px-0">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">Upload or Paste Video URL</h2>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="mb-3 sm:mb-4 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer w-full"
        />
        <div className="flex w-full mb-4 sm:mb-6 gap-2 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Paste video URL (mp4, webm, etc)"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-sm sm:text-base"
          />
          <button
            onClick={handleUrlAdd}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm sm:text-base mt-2 sm:mt-0"
            type="button"
          >
            Add URL
          </button>
        </div>
        {videoURL && (
          <video
            src={videoURL}
            controls
            className="w-full rounded-lg border border-gray-300 shadow mb-4"
            style={{ maxHeight: 400 }}
          >
            Your browser does not support the video tag.
          </video>
        )}
        {!videoURL && (
          <div className="text-gray-500 mt-2 sm:mt-4 text-center text-sm sm:text-base">No video selected. Please upload a local video file or paste a video URL.</div>
        )}
      </div>
    </div>
  );
}
