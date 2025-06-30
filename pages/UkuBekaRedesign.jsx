import React from 'react';
import { CameraProvider } from '../contexts/CameraContext';
import { SessionProvider } from '../contexts/SessionContext';
import { TranslationProvider } from '../contexts/TranslationContext';
import { UIProvider } from '../contexts/UIContext';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';
import Header from '../components/Header';
import GestureDetectionPanel from '../components/GestureDetectionPanel';
import SessionStatistics from '../components/SessionStatistics';
import TranslationOutput from '../components/TranslationOutput';

export default function UkuBekaRedesign() {
  return (
    <AccessibilityProvider>
      <UIProvider>
        <TranslationProvider>
          <SessionProvider>
            <CameraProvider>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#fefaf0] relative overflow-x-hidden">
                {/* Subtle geometric pattern background */}
                <div className="absolute inset-0 pointer-events-none opacity-5 select-none" aria-hidden="true">
                  {/* Example pattern: SVG or CSS pattern here */}
                </div>
                {/* Header */}
                <Header />
                {/* Main Content Grid */}
                <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
                  <GestureDetectionPanel />
                  <SessionStatistics />
                  <TranslationOutput />
                </main>
              </div>
            </CameraProvider>
          </SessionProvider>
        </TranslationProvider>
      </UIProvider>
    </AccessibilityProvider>
  );
}
