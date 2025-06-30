// Mock Text-to-Speech Service
export const TextToSpeechService = {
  speak: (text, lang = 'en') => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = lang;
      window.speechSynthesis.speak(utter);
    }
  }
};
