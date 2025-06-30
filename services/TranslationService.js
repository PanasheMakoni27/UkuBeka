// Mock Translation Service
export const TranslationService = {
  translate: async (gesture, language = 'en') => {
    // Simulate translation
    const translations = {
      hello: {
        en: 'Hello',
        zu: 'Sawubona',
        tn: 'Dumela',
        pronunciation: '/həˈləʊ/'
      }
    };
    return translations[gesture]?.[language] || 'Unknown';
  }
};
