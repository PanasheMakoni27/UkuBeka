import React from 'react';

export default function TranslationOutput() {
  return (
    <section className="rounded-2xl border border-[#f3f4f6] bg-white p-6 flex flex-col shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-[#374151]">Translation Output</h2>
      <div className="slide-in-text text-4xl font-bold text-[#374151] mb-4">Hello</div>
      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button className="floating-button bg-[#f59e0b] text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-transform">Copy</button>
        <button className="floating-button bg-[#14b8a6] text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-transform">Speak</button>
      </div>
      {/* Pronunciation Guide */}
      <details className="mb-4">
        <summary className="cursor-pointer text-[#059669] font-medium">Pronunciation Guide</summary>
        <div className="mt-2 text-[#6b7280]">/həˈləʊ/</div>
      </details>
      {/* Translation History */}
      <div className="mt-auto">
        <h3 className="text-lg font-semibold mb-2 text-[#374151]">History</h3>
        <ul className="space-y-1">
          <li className="slide-in-text text-[#6b7280]">Sawubona</li>
          <li className="slide-in-text text-[#6b7280]">Dumela</li>
        </ul>
      </div>
    </section>
  );
}
