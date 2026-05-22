/**
 * Server Configuration
 * Application-wide configuration settings
 */

module.exports = {
  // Server settings
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/linguax',
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key_change_in_production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // CORS Configuration
  CORS_ORIGIN: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // API Configuration
  API_PREFIX: '/api',
  API_VERSION: 'v1',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Password Configuration
  SALT_ROUNDS: 10,
  
  // File Upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // App Info
  APP_NAME: 'LinguaX',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Modern Language Learning Platform'
};
