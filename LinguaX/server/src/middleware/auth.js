/**
 * Authentication Middleware
 * Verify JWT tokens and protect routes
 */

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key_change_in_production');
    
    // Add user data to request
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired'
      });
    }

    res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};

module.exports = authMiddleware;
