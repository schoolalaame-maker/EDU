# LinguaX - Getting Started Guide

Welcome to **LinguaX**, a cutting-edge language learning platform built with modern technologies. This guide will help you set up and get started with the project.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Quick Start](#quick-start)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [API Documentation](#api-documentation)
7. [Frontend Development](#frontend-development)
8. [Backend Development](#backend-development)
9. [Database Setup](#database-setup)
10. [Deployment](#deployment)

---

## 📱 Project Overview

**LinguaX** is a comprehensive language learning platform featuring:

- 🎯 AI-powered personalized learning paths
- 🎮 Gamified lessons and quizzes
- 🎤 Speech recognition and pronunciation practice
- 📊 Progress tracking and analytics
- 🌍 50+ supported languages
- 📱 Fully responsive design
- 🔐 Secure JWT authentication
- ⚡ High-performance RESTful API

**Tech Stack:**
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

---

## 🏗️ Architecture Overview

### Frontend Architecture

```
client/
├── src/
│   ├── pages/          # HTML pages
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global and component styles
│   │   ├── global.css      # CSS variables and resets
│   │   ├── landing.css     # Landing page styles
│   │   └── components.css  # Component styles
│   ├── js/             # JavaScript functionality
│   │   ├── main.js         # Core utilities and API calls
│   │   └── animations.js   # Animations and interactions
│   └── assets/         # Images and icons
└── public/             # Static files
```

### Backend Architecture

```
server/
├── src/
│   ├── server.js       # Entry point
│   ├── auth/           # Authentication logic
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── database/       # Database initialization
│   ├── middleware/     # Express middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   └── utils/          # Helper functions
└── package.json        # Dependencies
```

### Clean Architecture Principles

1. **Separation of Concerns** - Each layer has a specific responsibility
2. **Modularity** - Independent, reusable modules
3. **Scalability** - Easy to add features
4. **Maintainability** - Clean, documented code

---

## 🚀 Quick Start

### Prerequisites

- Node.js v14+ ([Download](https://nodejs.org/))
- npm v6+ (comes with Node.js)
- MongoDB ([Local](https://docs.mongodb.com/manual/installation/) or [Atlas](https://www.mongodb.com/cloud/atlas))
- Git

### Installation Steps

#### 1. Clone and Setup

```bash
# Navigate to the project
cd LinguaX

# Install root dependencies
npm install
```

#### 2. Environment Configuration

Create `.env` file in `server/` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/linguax

# Authentication
JWT_SECRET=your_super_secret_key_change_in_production_12345
JWT_EXPIRE=7d

# Server
NODE_ENV=development
PORT=5000

# Client
CLIENT_URL=http://localhost:3000
```

#### 3. Install Dependencies

```bash
# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

#### 4. Run Development Servers

```bash
# From root directory - runs both servers concurrently
npm run dev

# OR run separately in different terminals
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

#### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

## 📁 Project Structure

### Root Level

```
LinguaX/
├── client/                 # Frontend application
├── server/                 # Backend application
├── package.json            # Root package.json
├── .gitignore              # Git ignore rules
├── README.md               # Main documentation
└── GETTING_STARTED.md      # This file
```

### Client Structure

```
client/
├── src/
│   ├── pages/
│   │   └── index.html                 # Landing page
│   ├── styles/
│   │   ├── global.css                 # Global styles
│   │   ├── landing.css                # Landing page styles
│   │   └── components.css             # Component styles
│   ├── js/
│   │   ├── main.js                    # Core utilities
│   │   └── animations.js              # Animations
│   ├── assets/
│   │   ├── images/                    # Image files
│   │   └── icons/                     # Icon files
│   └── components/                    # Component templates
├── public/                            # Static files
└── package.json
```

### Server Structure

```
server/
├── src/
│   ├── server.js                      # Express app entry point
│   ├── auth/                          # Auth utilities
│   ├── config/
│   │   ├── mongo.config.js            # MongoDB config
│   │   └── server.config.js           # Server config
│   ├── controllers/                   # Route controllers
│   ├── database/                      # DB initialization
│   ├── middleware/
│   │   ├── auth.js                    # Auth middleware
│   │   └── errorHandler.js            # Error handling
│   ├── models/                        # MongoDB models
│   ├── routes/
│   │   ├── auth.routes.js             # Auth routes
│   │   ├── user.routes.js             # User routes
│   │   ├── lesson.routes.js           # Lesson routes
│   │   ├── quiz.routes.js             # Quiz routes
│   │   └── progress.routes.js         # Progress routes
│   └── utils/                         # Helper functions
└── package.json
```

---

## 💻 Development Workflow

### Frontend Development

#### CSS Architecture

- **global.css**: CSS variables, resets, base styles
- **landing.css**: Landing page specific styles
- **components.css**: Reusable component styles

#### JavaScript Architecture

- **main.js**: Core utilities and API integration
- **animations.js**: Interactive features and animations

#### Adding New Pages

1. Create HTML in `client/src/pages/`
2. Create styles in `client/src/styles/`
3. Create JS in `client/src/js/`
4. Link stylesheets in HTML file

#### Styling Guidelines

- Use CSS variables for consistency
- Follow mobile-first approach
- Maintain 8px spacing system
- Use glassmorphism effects (#0f172a, #7c3aed, #22c55e)

### Backend Development

#### Adding New Routes

1. Create route file in `server/src/routes/`
2. Implement controller in `server/src/controllers/`
3. Import and register in `server.js`

#### Example Route

```javascript
// server/src/routes/example.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: []
  });
});

router.post('/', authMiddleware, (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Created successfully'
  });
});

module.exports = router;
```

#### Adding Models

1. Create schema in `server/src/models/`
2. Export Mongoose model
3. Use in controllers

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response:
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Protected Routes

Add Authorization header to all protected endpoints:
```
Authorization: Bearer <jwt_token>
```

### User Endpoints

#### Get Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

### Lessons Endpoints

#### Get All Lessons
```http
GET /lessons?page=1&limit=10
```

#### Get Lesson Details
```http
GET /lessons/:id
```

### Progress Endpoints

#### Get User Progress
```http
GET /progress
Authorization: Bearer <token>
```

#### Update Progress
```http
POST /progress/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "lessonId": "123",
  "score": 95,
  "completed": true
}
```

---

## 🎨 Frontend Development

### JavaScript API Usage

```javascript
// API Calls
await LinguaX.apiCall('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials)
});

// Utilities
LinguaX.showNotification('Success!', 'success');
LinguaX.saveToStorage('key', value);
const data = LinguaX.getFromStorage('key');

// Validation
if (LinguaX.isValidEmail(email)) {
  // Email is valid
}

// Animations
LinguaX.smoothScrollTo('elementId');
```

### Animation Features

- **Fade In**: `.animate-on-scroll` elements
- **Slide Animations**: Built-in CSS animations
- **3D Card Effects**: Hover parallax on cards
- **Ripple Effect**: Click animation on buttons
- **Parallax Scrolling**: `data-parallax` attribute

### Component Usage

#### Button
```html
<button class="btn-primary btn-lg">Click Me</button>
<button class="btn-secondary">Secondary</button>
```

#### Form
```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" placeholder="Enter email">
</div>
```

#### Card
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content here</p>
  </div>
</div>
```

---

## 🛠️ Backend Development

### Express Server Setup

The server is initialized in `server/src/server.js` with:

- Security middleware (Helmet)
- CORS configuration
- JSON body parser
- Logging (Morgan)
- Error handling
- Database connection

### Middleware

#### Authentication Middleware
```javascript
// Usage
router.get('/protected', authMiddleware, (req, res) => {
  const userId = req.userId;
  const userEmail = req.userEmail;
});
```

#### Error Handler
- Handles validation errors
- Manages JWT errors
- Logs errors in development
- Returns consistent error format

### Configuration

All configuration in `server/src/config/server.config.js`:

```javascript
module.exports = {
  PORT: 5000,
  JWT_SECRET: '...',
  MONGODB_URI: '...',
  // ... more config
};
```

---

## 🗄️ Database Setup

### MongoDB Connection

The application connects to MongoDB using Mongoose.

#### Local MongoDB Setup

```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows (as administrator)
net start MongoDB
```

#### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

#### Connection String Example

```
mongodb://localhost:27017/linguax
mongodb+srv://user:password@cluster.mongodb.net/linguax
```

### Database Models

Models are structured in `server/src/models/`:

```javascript
// Example User Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

---

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the project
2. Deploy `client/src` directory
3. Configure environment variables

### Backend Deployment (Heroku/AWS)

```bash
# Build
npm run build

# Deploy
# Push to Heroku/AWS with credentials
```

### Environment Variables

For production, set these on your hosting platform:

```
MONGODB_URI=<production_database_uri>
JWT_SECRET=<production_secret_key>
NODE_ENV=production
PORT=5000
CLIENT_URL=<production_url>
```

---

## 📊 Monitoring & Logging

### Development Logging

- Morgan logs all HTTP requests
- Error stack traces in development mode
- Console messages for debugging

### Health Check

```bash
curl http://localhost:5000/api/health
```

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

#### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string
- Verify credentials

#### CORS Error
- Check `CLIENT_URL` in `.env`
- Update CORS configuration in `server.js`

#### Module Not Found
```bash
# Reinstall dependencies
npm install
```

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create pull request

---

## 📞 Support

For issues and questions:
- Check existing documentation
- Review error messages carefully
- Check browser console for JavaScript errors
- Review server logs

---

**Happy Learning! 🚀**

Made with ❤️ by the LinguaX Team
