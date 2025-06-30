import React, { createContext, useState } from 'react';

export const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [language, setLanguage] = useState('en');
  const [history, setHistory] = useState([]);

  // Add more translation logic as needed

  return (
    <TranslationContext.Provider value={{ currentTranslation, setCurrentTranslation, confidence, setConfidence, language, setLanguage, history, setHistory }}>
      {children}
    </TranslationContext.Provider>
  );
}
