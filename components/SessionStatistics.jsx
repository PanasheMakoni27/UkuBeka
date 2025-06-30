import React from 'react';

export default function SessionStatistics() {
  return (
    <section className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-[#374151]">Session Statistics</h2>
      {/* Circular Progress Indicator */}
      <div className="mb-4 relative flex items-center justify-center">
        <svg className="w-20 h-20" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#f8fafc" strokeWidth="4" />
          <circle cx="20" cy="20" r="18" fill="none" stroke="#14b8a6" strokeWidth="4" strokeDasharray="113" strokeDashoffset="34" strokeLinecap="round" />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#374151] smooth-counter">70%</div>
      </div>
      {/* Word Count */}
      <div className="text-3xl font-bold text-[#374151] smooth-counter mb-2">123</div>
      <div className="text-sm text-[#6b7280]">Words Translated</div>
      {/* Status Indicator */}
      <div className="flex items-center gap-2 mt-4">
        <span className="status-dot bg-[#f59e0b] animate-pulse"></span>
        <span className="status-dot bg-[#059669]"></span>
        <span className="status-dot bg-[#64748b]"></span>
      </div>
    </section>
  );
}
