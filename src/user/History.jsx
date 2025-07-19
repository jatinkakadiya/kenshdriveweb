import React, { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'videoHistory';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Video History</h2>
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">History</h3>
          {history.length === 0 && <div className="text-gray-400 text-sm">No history yet.</div>}
          <ul className="space-y-2">
            {history.map((entry, idx) => (
              <li key={entry.added + '-' + idx} className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                <span className="truncate flex-1 text-gray-700 text-sm">{entry.type === 'file' ? entry.name : entry.url}</span>
                <span className="text-xs text-gray-400">{entry.type === 'file' ? 'Local' : 'URL'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 