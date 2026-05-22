/**
 * LinguaX Server Entry Point
 * Main Express server configuration and initialization
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import configuration
const mongoConfig = require('./config/mongo.config');
const serverConfig = require('./config/server.config');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// Initialize Express app
const app = express();

// ===== Security Middleware =====
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// ===== Body Parser Middleware =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ===== Logging Middleware =====
app.use(morgan('combined'));

// ===== Health Check Route =====
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'LinguaX Server is running',
    timestamp: new Date().toISOString()
  });
});

// ===== API Routes =====
// Authentication routes
app.use('/api/auth', require('./routes/auth.routes'));

// User routes
app.use('/api/users', authMiddleware, require('./routes/user.routes'));

// Lessons routes
app.use('/api/lessons', require('./routes/lesson.routes'));

// Quiz routes
app.use('/api/quizzes', require('./routes/quiz.routes'));

// Progress routes
app.use('/api/progress', authMiddleware, require('./routes/progress.routes'));

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path
  });
});

// ===== Error Handling Middleware =====
app.use(errorHandler);

// ===== Initialize Database Connection =====
mongoConfig.connectDB();

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║     LinguaX Server Started          ║
║     Server: http://localhost:${PORT}   ║
║     Environment: ${process.env.NODE_ENV || 'development'}     ║
╚════════════════════════════════════╝
  `);
});

// ===== Handle Graceful Shutdown =====
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
