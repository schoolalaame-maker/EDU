/**
 * Lessons Routes
 * Course and lesson management
 */

const express = require('express');
const router = express.Router();

// Get all lessons
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: []
  });
});

// Get lesson by ID
router.get('/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {}
  });
});

module.exports = router;
