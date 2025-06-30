// Mock Analytics Service
export const AnalyticsService = {
  trackEvent: (event, data) => {
    // Simulate analytics event
    console.log('Analytics event:', event, data);
  }
};
