/**
 * Quiz Routes
 * Quiz management and submissions
 */

const express = require('express');
const router = express.Router();

// Get all quizzes
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: []
  });
});

// Get quiz by ID
router.get('/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {}
  });
});

module.exports = router;
