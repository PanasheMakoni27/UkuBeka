import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export function UIProvider({ children }) {
  const [modal, setModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState('light');
  const [highContrast, setHighContrast] = useState(false);

  // Add more UI state logic as needed

  return (
    <UIContext.Provider value={{ modal, setModal, notification, setNotification, theme, setTheme, highContrast, setHighContrast }}>
      {children}
    </UIContext.Provider>
  );
}
