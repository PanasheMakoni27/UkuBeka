import React, { useState } from 'react';
import CameraSettings from './CameraSettings'; // Import CameraSettings component

// Example gesture data
const GESTURES = [
  {
    name: 'Hello',
    image: '/static/gestures/hello.png',
    description: 'A greeting gesture with an open hand.',
    category: 'Greeting'
  },
  {
    name: 'Thank You',
    image: '/static/gestures/thankyou.png',
    description: 'Gesture for expressing gratitude.',
    category: 'Politeness'
  },
  {
    name: 'Yes',
    image: '/static/gestures/yes.png',
    description: 'Nodding or thumbs up gesture.',
    category: 'Confirmation'
  },
  {
    name: 'No',
    image: '/static/gestures/no.png',
    description: 'Shaking hand or finger for negation.',
    category: 'Confirmation'
  },
  // ...add more gestures as needed
];

const categories = [
  'All',
  ...Array.from(new Set(GESTURES.map(g => g.category)))
];

export default function GestureDictionary() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ukubeka_camera_settings')) || {};
    } catch {
      return {};
    }
  });

  const filteredGestures = GESTURES.filter(g =>
    (category === 'All' || g.category === category) &&
    (g.name.toLowerCase().includes(search.toLowerCase()) ||
     g.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search gestures..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGestures.map(gesture => (
          <div key={gesture.name} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <img
              src={gesture.image}
              alt={gesture.name}
              className="w-24 h-24 object-contain mb-3"
            />
            <div className="font-bold text-lg mb-1">{gesture.name}</div>
            <div className="text-sm text-gray-600 mb-2">{gesture.description}</div>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded">{gesture.category}</span>
          </div>
        ))}
        {filteredGestures.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            No gestures found.
          </div>
        )}
      </div>
      {/* Example usage of CameraSettings component */}
      <CameraSettings onChange={setSettings} />
    </div>
  );
}
