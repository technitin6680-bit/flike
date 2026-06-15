export const BASE_PRICES: Record<string, number> = {
  'Personal Website': 2999,
  'Portfolio Website': 3999,
  'Blog Website': 4999,
  'Business Website': 5999,
  'Restaurant Website': 6999,
  'NGO Website': 7999,
  'Political Website': 9999,
  'School/College Website': 9999,
  'News Website': 12999,
  'E-commerce Website': 19999,
  'Custom Website': 0 // Quote Based
};

export const FEATURE_PRICES: Record<string, number> = {
  'Login/Signup System': 1000,
  'Admin Panel': 2000,
  'Payment Gateway': 2500,
  'Appointment Booking': 1500,
  'Multi-language Support': 2000,
  'SEO Optimization': 1500,
  'SMS Notifications': 1000,
  'Live Chat': 1000,
  'User Dashboard': 1000,
  'Blog Section': 500,
  'Contact Form': 0,
  'WhatsApp Integration': 500,
  'E-commerce Store': 3000,
  'Product Management': 1500,
  'Order Tracking': 1500,
  'Image Gallery': 500,
  'Portfolio Section': 500,
  'News Section': 1000,
  'Custom Forms': 500,
  'Email Notifications': 500,
};

export function calculateEstimatedCost(websiteType: string, selectedFeatures: string[]): number {
  const baseCost = BASE_PRICES[websiteType] || 0;
  if (websiteType === 'Custom Website') return 0; // Special case

  const featuresCost = selectedFeatures.reduce((acc, feature) => {
    return acc + (FEATURE_PRICES[feature] || 0);
  }, 0);

  return baseCost + featuresCost;
}
