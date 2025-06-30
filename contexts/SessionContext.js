import React, { createContext, useState, useRef } from 'react';

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [words, setWords] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [history, setHistory] = useState([]);
  const timerRef = useRef(null);

  // Add more session management logic as needed

  return (
    <SessionContext.Provider value={{ words, setWords, accuracy, setAccuracy, sessionTime, setSessionTime, history, setHistory, timerRef }}>
      {children}
    </SessionContext.Provider>
  );
}
