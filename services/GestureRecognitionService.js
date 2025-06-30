// Mock Gesture Recognition Service
export const GestureRecognitionService = {
  recognize: async (videoFrame) => {
    // Simulate gesture recognition
    return {
      gesture: 'hello',
      confidence: Math.random() * 0.2 + 0.8, // 0.8-1.0
      timeout: false
    };
  }
};
