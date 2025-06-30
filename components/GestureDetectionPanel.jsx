import React from 'react';

export default function GestureDetectionPanel() {
  return (
    <section className="rounded-2xl shadow-lg bg-gradient-to-b from-slate-50 to-slate-100 p-6 flex flex-col items-center camera-preview">
      {/* Camera preview placeholder */}
      <div className="w-full aspect-video bg-slate-200 rounded-xl shadow-inner mb-4 flex items-center justify-center relative">
        <span className="pulse-indicator absolute left-4 top-4 w-4 h-4 bg-[#14b8a6] rounded-full"></span>
        <svg className="w-12 h-12 text-[#64748b] opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
      </div>
      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-[#14b8a6] to-[#059669] transition-all duration-500" style={{ width: '60%' }}></div>
      </div>
      {/* Start Button */}
      <button className="floating-button bg-[#14b8a6] hover:bg-[#059669] text-white rounded-full shadow-lg px-6 py-3 mt-2 transition-transform duration-200 ease-out">
        Start Detection
      </button>
    </section>
  );
}
