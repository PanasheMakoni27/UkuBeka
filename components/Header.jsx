import React from 'react';

export default function Header() {
  return (
    <header className="py-8 flex flex-col items-center justify-center">
      <img src="/logo.svg" alt="UkuBeka Logo" className="h-16 mb-2" />
      <h1 className="text-3xl font-bold text-[#64748b] tracking-tight">UkuBeka</h1>
      <p className="text-lg text-[#6b7280] font-medium">Bridge communication. Empower lives.</p>
    </header>
  );
}
