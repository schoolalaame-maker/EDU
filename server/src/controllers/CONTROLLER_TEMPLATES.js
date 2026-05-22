/**
 * LinguaX API Controllers - Template Structure
 * This file provides templates for creating RESTful controllers
 * 
 * Best Practices:
 * - Keep controllers thin (delegation logic to services)
 * - Validate input at controller level
 * - Return consistent response format
 * - Handle errors gracefully
 * - Use async/await
 */

// ========== CONTROLLER RESPONSE FORMAT ==========

const sendResponse = (res, status = 200, data = {}, message = '') => {
  res.status(status).json({
    status: status >= 400 ? 'error' : 'success',
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  });
};

// ========== USER CONTROLLER TEMPLATE ==========

const UserController = {
  /**
   * Get user profile
   */
  getProfile: async (req, res) => {
    try {
      const userId = req.userId;

      // TODO: Fetch user from database
      const user = {
        id: userId,
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        profilePicture: null,
        joinedDate: new Date()
      };

      sendResponse(res, 200, user, 'Profile retrieved successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (req, res) => {
    try {
      const { firstName, lastName, profilePicture } = req.body;
      const userId = req.userId;

      // Validate input
      if (!firstName || !lastName) {
        return sendResponse(res, 400, {}, 'First name and last name are required');
      }

      // TODO: Update user in database

      sendResponse(res, 200, {}, 'Profile updated successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * Delete user account
   */
  deleteAccount: async (req, res) => {
    try {
      const userId = req.userId;

      // TODO: Delete user from database
      // TODO: Delete associated data

      sendResponse(res, 200, {}, 'Account deleted successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  }
};

// ========== LESSON CONTROLLER TEMPLATE ==========

const LessonController = {
  /**
   * Get all lessons with pagination
   */
  getAllLessons: async (req, res) => {
    try {
      const { page = 1, limit = 10, language = '', difficulty = '' } = req.query;

      // Validate pagination
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
      const skip = (pageNum - 1) * limitNum;

      // TODO: Fetch lessons from database with filters
      const lessons = [
        {
          id: '1',
          title: 'Beginner Spanish Basics',
          language: 'Spanish',
          difficulty: 'Beginner',
          description: 'Learn basic Spanish phrases',
          duration: 30,
          lessonCount: 10
        }
      ];

      // TODO: Get total count for pagination
      const total = 1;

      sendResponse(res, 200, {
        lessons: lessons,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: total,
          totalPages: Math.ceil(total / limitNum)
        }
      }, 'Lessons retrieved successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * Get lesson by ID
   */
  getLessonById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return sendResponse(res, 400, {}, 'Lesson ID is required');
      }

      // TODO: Fetch lesson from database
      const lesson = {
        id: id,
        title: 'Spanish Basics',
        content: {
          introduction: 'Learn the basics...',
          sections: []
        },
        exercises: []
      };

      sendResponse(res, 200, lesson, 'Lesson retrieved successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * Create new lesson (admin only)
   */
  createLesson: async (req, res) => {
    try {
      const { title, description, language, difficulty, content } = req.body;

      // Validate required fields
      if (!title || !language || !difficulty) {
        return sendResponse(res, 400, {}, 'Title, language, and difficulty are required');
      }

      // TODO: Create lesson in database

      sendResponse(res, 201, {}, 'Lesson created successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  }
};

// ========== QUIZ CONTROLLER TEMPLATE ==========

const QuizController = {
  /**
   * Get quiz by ID
   */
  getQuiz: async (req, res) => {
    try {
      const { id } = req.params;

      // TODO: Fetch quiz from database
      const quiz = {
        id: id,
        title: 'Spanish Vocabulary Quiz',
        questions: [
          {
            id: '1',
            text: 'What does "hola" mean?',
            type: 'multiple-choice',
            options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
            correctAnswer: 0
          }
        ]
      };

      sendResponse(res, 200, quiz, 'Quiz retrieved successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * Submit quiz answers
   */
  submitQuiz: async (req, res) => {
    try {
      const { quizId, answers } = req.body;
      const userId = req.userId;

      if (!quizId || !answers) {
        return sendResponse(res, 400, {}, 'Quiz ID and answers are required');
      }

      // TODO: Grade quiz
      // TODO: Save result to database
      const score = 85;
      const totalQuestions = 10;

      sendResponse(res, 200, {
        score: score,
        totalQuestions: totalQuestions,
        percentage: (score / totalQuestions) * 100,
        passed: score >= 70
      }, 'Quiz submitted successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  }
};

// ========== PROGRESS CONTROLLER TEMPLATE ==========

const ProgressController = {
  /**
   * Get user progress
   */
  getProgress: async (req, res) => {
    try {
      const userId = req.userId;

      // TODO: Fetch progress from database
      const progress = {
        userId: userId,
        totalLessonsCompleted: 25,
        totalXP: 1200,
        streak: 5,
        currentLevel: 'Intermediate',
        achievements: [],
        recentActivities: []
      };

      sendResponse(res, 200, progress, 'Progress retrieved successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * Update progress
   */
  updateProgress: async (req, res) => {
    try {
      const { lessonId, score, completed } = req.body;
      const userId = req.userId;

      if (!lessonId) {
        return sendResponse(res, 400, {}, 'Lesson ID is required');
      }

      // TODO: Save progress to database
      // TODO: Update user stats

      sendResponse(res, 200, {}, 'Progress updated successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  }
};

// ========== AUTH CONTROLLER TEMPLATE ==========

const AuthController = {
  /**
   * Register new user
   */
  register: async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Validate input
      if (!email || !password || !firstName || !lastName) {
        return sendResponse(res, 400, {}, 'All fields are required');
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return sendResponse(res, 400, {}, 'Invalid email format');
      }

      // Validate password strength
      if (password.length < 8) {
        return sendResponse(res, 400, {}, 'Password must be at least 8 characters long');
      }

      // TODO: Check if user already exists
      // TODO: Hash password
      // TODO: Save user to database

      sendResponse(res, 201, {}, 'User registered successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * User login
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return sendResponse(res, 400, {}, 'Email and password are required');
      }

      // TODO: Find user in database
      // TODO: Compare password hash
      // TODO: Generate JWT token

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

      sendResponse(res, 200, {
        token: token,
        user: {
          id: 'user123',
          email: email,
          firstName: 'John',
          lastName: 'Doe'
        }
      }, 'Login successful');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  },

  /**
   * Refresh JWT token
   */
  refreshToken: async (req, res) => {
    try {
      const userId = req.userId;

      // TODO: Generate new JWT token

      const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

      sendResponse(res, 200, {
        token: newToken
      }, 'Token refreshed successfully');
    } catch (error) {
      sendResponse(res, 500, {}, error.message);
    }
  }
};

// ========== EXPORT TEMPLATES ==========

module.exports = {
  sendResponse,
  UserController,
  LessonController,
  QuizController,
  ProgressController,
  AuthController
};

/**
 * USAGE EXAMPLES:
 * 
 * In your route files:
 * 
 * const { UserController } = require('../controllers/userController');
 * 
 * router.get('/profile', authMiddleware, UserController.getProfile);
 * router.put('/profile', authMiddleware, UserController.updateProfile);
 * router.get('/lessons', LessonController.getAllLessons);
 * 
 * The controllers will automatically handle:
 * - Input validation
 * - Database operations
 * - Error handling
 * - Response formatting
 */
