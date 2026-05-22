/**
 * Progress Routes
 * User learning progress tracking
 */

const express = require('express');
const router = express.Router();

// Get user progress
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      userId: req.userId,
      progress: {}
    }
  });
});

// Update progress
router.post('/update', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Progress updated successfully'
  });
});

module.exports = router;
