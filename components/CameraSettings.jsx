import React, { useEffect, useState } from 'react';

const SETTINGS_KEY = 'ukubeka_camera_settings';

function getInitialSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
      facingMode: 'user',
      sensitivity: 0.7,
      gestureSensitivity: 0.5
    };
  } catch {
    return { facingMode: 'user', sensitivity: 0.7, gestureSensitivity: 0.5 };
  }
}

export default function CameraSettings({ onChange }) {
  const [facingMode, setFacingMode] = useState(getInitialSettings().facingMode);
  const [sensitivity, setSensitivity] = useState(getInitialSettings().sensitivity);
  const [gestureSensitivity, setGestureSensitivity] = useState(getInitialSettings().gestureSensitivity);

  useEffect(() => {
    const settings = { facingMode, sensitivity, gestureSensitivity };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    if (onChange) onChange(settings);
  }, [facingMode, sensitivity, gestureSensitivity, onChange]);

  return (
    <div className="p-4 bg-white rounded-xl shadow max-w-md mx-auto flex flex-col gap-4">
      <div>
        <label className="font-semibold block mb-2">Camera</label>
        <div className="flex gap-4">
          <button
            className={`px-3 py-1 rounded ${facingMode === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setFacingMode('user')}
          >
            Front
          </button>
          <button
            className={`px-3 py-1 rounded ${facingMode === 'environment' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setFacingMode('environment')}
          >
            Rear
          </button>
        </div>
      </div>
      <div>
        <label className="font-semibold block mb-2">Frame Sensitivity</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={sensitivity}
          onChange={e => setSensitivity(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">Current: {sensitivity}</div>
      </div>
      <div>
        <label className="font-semibold block mb-2">Gesture Detection Sensitivity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={gestureSensitivity}
          onChange={e => setGestureSensitivity(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">Current: {gestureSensitivity}</div>
      </div>
    </div>
  );
}
