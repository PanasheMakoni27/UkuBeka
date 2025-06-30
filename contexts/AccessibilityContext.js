import React, { createContext, useState } from 'react';

export const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState('md');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  // Add more accessibility logic as needed

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize, reducedMotion, setReducedMotion, screenReader, setScreenReader }}>
      {children}
    </AccessibilityContext.Provider>
  );
}
