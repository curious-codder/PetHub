

// Environment configuration for API endpoints
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://localhost:7000/api',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

