/**
 * Error Handler Middleware
 * Centralized error handling for the application
 */

const errorHandler = (err, req, res, next) => {
  // Default error values
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map(e => e.message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    status = 409;
    message = 'Duplicate field value entered';
    const field = Object.keys(err.keyValue)[0];
    errors = [`${field} already exists`];
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', {
      status,
      message,
      stack: err.stack,
      errors
    });
  }

  // Send error response
  res.status(status).json({
    status: 'error',
    message,
    errors: errors.length > 0 ? errors : undefined,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
