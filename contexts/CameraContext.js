import React, { createContext, useState, useRef, useCallback } from 'react';

export const CameraContext = createContext();

export function CameraProvider({ children }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const requestCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setHasPermission(true);
      setError(null);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      setError(err.message);
      setHasPermission(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setHasPermission(false);
    }
  }, [stream]);

  return (
    <CameraContext.Provider value={{ hasPermission, stream, error, videoRef, requestCamera, stopCamera }}>
      {children}
    </CameraContext.Provider>
  );
}
