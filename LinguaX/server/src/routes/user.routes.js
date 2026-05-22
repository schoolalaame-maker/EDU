/**
 * User Routes
 * User profile and account management
 */

const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      id: req.userId,
      email: req.userEmail
    }
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully'
  });
});

module.exports = router;
