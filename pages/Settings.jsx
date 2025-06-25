import React, { useEffect, useState } from 'react';

const SETTINGS_KEY = 'ukubeka_camera_settings';
const LANG_KEY = 'ukubeka_language';
const ONBOARDING_KEY = 'hasCompletedOnboarding';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'xh', label: 'Xhosa' },
  { code: 'zu', label: 'Zulu' }
];

function getInitialSettings() {
  let settings = {
    facingMode: 'user',
    sensitivity: 0.7,
    gestureSensitivity: 0.5,
    language: 'en',
    onboarding: localStorage.getItem(ONBOARDING_KEY) !== 'true'
  };
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (stored) Object.assign(settings, stored);
    const lang = localStorage.getItem(LANG_KEY);
    if (lang) settings.language = lang;
  } catch {}
  return settings;
}

export default function Settings() {
  const [settings, setSettings] = useState(getInitialSettings());

  useEffect(() => {
    const { language, onboarding, ...cameraSettings } = settings;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(cameraSettings));
    localStorage.setItem(LANG_KEY, language);
    if (onboarding) {
      localStorage.removeItem(ONBOARDING_KEY);
    } else {
      localStorage.setItem(ONBOARDING_KEY, 'true');
    }
  }, [settings]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      {/* Language */}
      <div>
        <label className="font-semibold block mb-2">Language</label>
        <select
          value={settings.language}
          onChange={e => setSettings(s => ({ ...s, language: e.target.value }))}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </div>
      {/* Camera Preferences */}
      <div>
        <label className="font-semibold block mb-2">Camera</label>
        <div className="flex gap-4">
          <button
            className={`px-3 py-1 rounded ${settings.facingMode === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setSettings(s => ({ ...s, facingMode: 'user' }))}
          >
            Front
          </button>
          <button
            className={`px-3 py-1 rounded ${settings.facingMode === 'environment' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setSettings(s => ({ ...s, facingMode: 'environment' }))}
          >
            Rear
          </button>
        </div>
      </div>
      {/* Sensitivity */}
      <div>
        <label className="font-semibold block mb-2">Frame Sensitivity</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={settings.sensitivity}
          onChange={e => setSettings(s => ({ ...s, sensitivity: Number(e.target.value) }))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">Current: {settings.sensitivity}</div>
      </div>
      <div>
        <label className="font-semibold block mb-2">Gesture Detection Sensitivity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.gestureSensitivity}
          onChange={e => setSettings(s => ({ ...s, gestureSensitivity: Number(e.target.value) }))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">Current: {settings.gestureSensitivity}</div>
      </div>
      {/* Onboarding */}
      <div>
        <label className="font-semibold block mb-2">Show Onboarding On Next Visit</label>
        <input
          type="checkbox"
          checked={settings.onboarding}
          onChange={e => setSettings(s => ({ ...s, onboarding: e.target.checked }))}
        />
        <span className="ml-2 text-gray-700">{settings.onboarding ? 'Enabled' : 'Disabled'}</span>
      </div>
    </div>
  );
}
