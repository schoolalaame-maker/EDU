/**
 * LinguaX Database Models - Template Structure
 * MongoDB Schemas using Mongoose
 * 
 * Best Practices:
 * - Add proper indexing for frequently queried fields
 * - Use timestamps for audit trails
 * - Add validation at schema level
 * - Use middleware for hashing passwords
 * - Keep schemas normalized
 */

const mongoose = require('mongoose');

// ========== USER MODEL ==========

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
    },
    
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false // Don't return password by default
    },
    
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    
    profilePicture: {
      type: String,
      default: null
    },
    
    nativeLanguage: {
      type: String,
      default: 'English'
    },
    
    languagesLearning: [{
      language: String,
      level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Fluent'],
        default: 'Beginner'
      }
    }],
    
    totalXP: {
      type: Number,
      default: 0
    },
    
    streak: {
      type: Number,
      default: 0
    },
    
    lastActivityDate: {
      type: Date,
      default: Date.now
    },
    
    preferences: {
      theme: {
        type: String,
        enum: ['dark', 'light'],
        default: 'dark'
      },
      language: {
        type: String,
        default: 'en'
      },
      notifications: {
        type: Boolean,
        default: true
      }
    },
    
    isVerified: {
      type: Boolean,
      default: false
    },
    
    role: {
      type: String,
      enum: ['user', 'instructor', 'admin'],
      default: 'user'
    },
    
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Index for frequently queried fields
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

module.exports.User = mongoose.model('User', userSchema);

// ========== LESSON MODEL ==========

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true
    },
    
    description: {
      type: String,
      required: true
    },
    
    language: {
      type: String,
      required: [true, 'Language is required']
    },
    
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    
    category: {
      type: String,
      required: true
    },
    
    content: {
      introduction: String,
      sections: [{
        title: String,
        content: String,
        examples: [String]
      }],
      vocabulary: [{
        word: String,
        translation: String,
        pronunciation: String,
        exampleSentence: String
      }]
    },
    
    exercises: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    }],
    
    estimatedDuration: {
      type: Number, // in minutes
      default: 30
    },
    
    imageUrl: String,
    
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    
    totalStudents: {
      type: Number,
      default: 0
    },
    
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

lessonSchema.index({ language: 1, difficulty: 1 });
lessonSchema.index({ instructor: 1 });

module.exports.Lesson = mongoose.model('Lesson', lessonSchema);

// ========== QUIZ MODEL ==========

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    
    description: String,
    
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    
    language: {
      type: String,
      required: true
    },
    
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    
    questions: [{
      text: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['multiple-choice', 'short-answer', 'matching', 'fill-blank'],
        required: true
      },
      options: [String], // For multiple choice
      correctAnswer: mongoose.Schema.Types.Mixed,
      explanation: String,
      points: {
        type: Number,
        default: 1
      }
    }],
    
    passingScore: {
      type: Number,
      default: 70,
      min: 0,
      max: 100
    },
    
    timeLimit: {
      type: Number, // in minutes
      default: null
    },
    
    totalPoints: {
      type: Number,
      required: true
    },
    
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

quizSchema.index({ lesson: 1 });

module.exports.Quiz = mongoose.model('Quiz', quizSchema);

// ========== PROGRESS MODEL ==========

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    
    language: {
      type: String,
      required: true
    },
    
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started'
    },
    
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    
    quizScores: [{
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
      },
      score: Number,
      attempts: Number,
      bestScore: Number,
      completedAt: Date
    }],
    
    xpEarned: {
      type: Number,
      default: 0
    },
    
    timeSpent: {
      type: Number, // in minutes
      default: 0
    },
    
    lastAccessedAt: Date,
    
    completedAt: Date,
    
    notes: String
  },
  {
    timestamps: true
  }
);

progressSchema.index({ user: 1, language: 1 });
progressSchema.index({ user: 1, lesson: 1 });

module.exports.Progress = mongoose.model('Progress', progressSchema);

// ========== ACHIEVEMENT MODEL ==========

const achievementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    
    description: String,
    
    icon: String,
    
    requirement: {
      type: {
        type: String,
        enum: ['xp', 'streak', 'lessons-completed', 'quizzes-passed'],
        required: true
      },
      value: Number
    },
    
    rarity: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'common'
    },
    
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports.Achievement = mongoose.model('Achievement', achievementSchema);

// ========== USER ACHIEVEMENT MODEL ==========

const userAchievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement',
      required: true
    },
    
    unlockedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

userAchievementSchema.index({ user: 1, achievement: 1 }, { unique: true });

module.exports.UserAchievement = mongoose.model('UserAchievement', userAchievementSchema);

// ========== VOCABULARY MODEL ==========

const vocabularySchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true
    },
    
    word: {
      type: String,
      required: true,
      trim: true
    },
    
    pronunciation: String,
    
    translation: String,
    
    definition: String,
    
    exampleSentences: [String],
    
    partOfSpeech: {
      type: String,
      enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'other']
    },
    
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    
    category: String,
    
    relatedWords: [String],
    
    synonyms: [String],
    
    audioUrl: String,
    
    imageUrl: String,
    
    frequency: {
      type: Number,
      default: 0 // How often it appears
    }
  },
  {
    timestamps: true
  }
);

vocabularySchema.index({ language: 1, word: 1 });

module.exports.Vocabulary = mongoose.model('Vocabulary', vocabularySchema);

// ========== COMMENTS MODEL ==========

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    
    content: {
      type: String,
      required: true
    },
    
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    
    isApproved: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

commentSchema.index({ lesson: 1, createdAt: -1 });

module.exports.Comment = mongoose.model('Comment', commentSchema);

/**
 * USAGE EXAMPLES:
 * 
 * const { User, Lesson, Quiz, Progress } = require('./models');
 * 
 * // Create new user
 * const newUser = await User.create({
 *   email: 'user@example.com',
 *   password: 'hashedPassword',
 *   firstName: 'John',
 *   lastName: 'Doe'
 * });
 * 
 * // Find lessons
 * const lessons = await Lesson.find({ language: 'Spanish', difficulty: 'Beginner' });
 * 
 * // Get user progress
 * const progress = await Progress.findOne({ user: userId })
 *   .populate('lesson')
 *   .exec();
 */
