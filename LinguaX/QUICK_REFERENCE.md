# LinguaX - Quick Reference Guide

## 🚀 Quick Start (5 minutes)

### 1. Install
```bash
cd LinguaX
npm install
```

### 2. Setup Environment (server/.env)
```env
MONGODB_URI=mongodb://localhost:27017/linguax
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 3. Run
```bash
npm run dev
```

### 4. Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📁 File Reference

### Frontend HTML
```
client/src/pages/index.html
```
Landing page with navbar, hero, features, languages, testimonials, CTA, footer

### Frontend Styles
```
client/src/styles/global.css        → Base styles, CSS variables, animations
client/src/styles/landing.css       → Page-specific styles
client/src/styles/components.css    → Reusable component styles
```

### Frontend JavaScript
```
client/src/js/main.js               → Core utilities and API calls
client/src/js/animations.js         → Interactive features
```

### Backend Entry Point
```
server/src/server.js                → Express app initialization
```

### Backend Routes
```
server/src/routes/auth.routes.js     → /api/auth/*
server/src/routes/user.routes.js     → /api/users/*
server/src/routes/lesson.routes.js   → /api/lessons/*
server/src/routes/quiz.routes.js     → /api/quizzes/*
server/src/routes/progress.routes.js → /api/progress/*
```

### Backend Configuration
```
server/src/config/mongo.config.js    → MongoDB setup
server/src/config/server.config.js   → Server settings
```

### Backend Middleware
```
server/src/middleware/auth.js        → JWT verification
server/src/middleware/errorHandler.js → Error handling
```

### Templates
```
server/src/controllers/CONTROLLER_TEMPLATES.js  → Example implementations
server/src/models/MODELS_TEMPLATE.js            → Schema examples
```

---

## 🎨 CSS Variables Reference

```css
/* Colors */
--color-bg: #0f172a;
--color-primary: #7c3aed;
--color-secondary: #22c55e;
--color-text: #ffffff;
--color-text-secondary: #94a3b8;

/* Spacing */
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Radius */
--radius-md: 0.5rem;
--radius-lg: 1rem;

/* Transitions */
--transition-base: 300ms ease-in-out;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
--gradient-secondary: linear-gradient(135deg, #22c55e 0%, #4ade80 100%);
```

---

## 🔗 API Endpoints

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### Users (Protected)
```http
GET /api/users/profile
PUT /api/users/profile
```

### Lessons (Public)
```http
GET /api/lessons
GET /api/lessons/:id
```

### Quizzes (Public)
```http
GET /api/quizzes
GET /api/quizzes/:id
POST /api/quizzes/:id/submit
```

### Progress (Protected)
```http
GET /api/progress
POST /api/progress/update
```

---

## 💻 JavaScript API (LinguaX)

### Core Methods

```javascript
// API Calls
await LinguaX.apiCall('/endpoint', options)

// Notifications
LinguaX.showNotification(message, type)

// Storage
LinguaX.saveToStorage(key, value)
LinguaX.getFromStorage(key)
LinguaX.removeFromStorage(key)

// Validation
LinguaX.isValidEmail(email)
LinguaX.validatePassword(password)

// Utilities
LinguaX.debounce(callback, delay)
LinguaX.throttle(callback, limit)
LinguaX.smoothScrollTo(elementId)
LinguaX.copyToClipboard(text)

// DOM
LinguaX.getID(id) // getElementById
LinguaX.getClass(className) // querySelectorAll
LinguaX.query(selector) // querySelectorAll
```

### Animation Methods

```javascript
LinguaXAnimations.typeAnimation(element, text, speed)
LinguaXAnimations.animateCounter(element, target, duration)
LinguaXAnimations.showModal(modalId)
LinguaXAnimations.closeModal(modalId)
LinguaXAnimations.addRippleEffect()
```

---

## 🎨 Component Classes

### Buttons
```html
<button class="btn-primary">Primary Button</button>
<button class="btn-primary btn-lg">Large Button</button>
<button class="btn-secondary">Secondary</button>
```

### Forms
```html
<div class="form-group">
  <label class="form-label">Label</label>
  <input class="form-input" type="text">
</div>
```

### Cards
```html
<div class="card">
  <div class="card-header"><h3>Title</h3></div>
  <div class="card-body">Content</div>
  <div class="card-footer">Footer</div>
</div>
```

### Badges
```html
<span class="badge badge-primary">Badge</span>
<span class="badge badge-secondary">Badge</span>
```

### Alerts
```html
<div class="alert alert-success">
  <div class="alert-icon">✓</div>
  <div class="alert-content">Success message</div>
</div>
```

---

## 📝 Common Tasks

### Add New Page

1. Create HTML in `client/src/pages/`
2. Create CSS in `client/src/styles/`
3. Create JS in `client/src/js/`

### Add New API Endpoint

1. Create/edit file in `server/src/routes/`
2. Create handler in `server/src/controllers/`
3. Register route in `server.js`

### Add Database Model

1. Create schema in `server/src/models/`
2. Add validations
3. Add indexes

### Style New Component

1. Define in `client/src/styles/components.css`
2. Use CSS variables for consistency
3. Add mobile breakpoints

---

## 🔒 Authentication Usage

### Protected Route (Frontend)
```javascript
const token = LinguaX.getFromStorage('authToken');
if (!token) {
  // Redirect to login
}
```

### Protected Endpoint (Backend)
```javascript
router.get('/protected', authMiddleware, (req, res) => {
  const userId = req.userId;
  // Handle request
});
```

### Make Authenticated Request
```javascript
await LinguaX.apiCall('/protected-endpoint', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🐛 Debugging Tips

### Check API Health
```bash
curl http://localhost:5000/api/health
```

### View Server Logs
- Check terminal for Morgan HTTP logs
- Check error messages in console

### Debug Frontend
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

### View Database
```bash
# Using MongoDB shell
mongosh
use linguax
db.users.find()
```

---

## 📦 Folder Structure Quick Map

```
LinguaX/
├── client/              Frontend
│   └── src/
│       ├── pages/       HTML
│       ├── styles/      CSS
│       ├── js/          JavaScript
│       └── assets/      Images, icons
├── server/              Backend
│   └── src/
│       ├── routes/      Endpoints
│       ├── controllers/ Handlers
│       ├── models/      Schemas
│       ├── middleware/  Middleware
│       └── config/      Configuration
├── docs/                Documentation
└── config              Config files
```

---

## 🎯 Development Workflow

### Daily Workflow
```bash
# Start dev servers
npm run dev

# In separate terminal for Node debugging
# node --inspect server/src/server.js

# Run tests (when implemented)
npm test
```

### Creating Features
1. Plan feature in design docs
2. Create backend routes
3. Create database models
4. Create frontend components
5. Test API endpoints
6. Test UI/UX
7. Commit changes

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `GETTING_STARTED.md` | Setup guide |
| `PROJECT_SUMMARY.md` | Completion summary |
| `QUICK_REFERENCE.md` | This file |
| `.env.example` | Environment template |

---

## 🚀 Deployment Commands

### Build for Production
```bash
npm run build
```

### Frontend Deploy (Vercel)
```bash
npm i -g vercel
vercel
```

### Backend Deploy (Heroku)
```bash
heroku login
heroku create linguax
git push heroku main
```

---

## 🔧 Useful npm Commands

```bash
# Install all dependencies
npm install

# Run development servers
npm run dev

# Run specific server
npm run server
npm run client

# Build for production
npm run build

# Start production server
npm start

# Install new package
npm install package-name

# Remove package
npm uninstall package-name
```

---

## 📱 Breakpoints

```css
/* Desktop (Default) */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small mobile */ }
```

---

## 🎨 Animation Classes

```css
.animate-in              /* Fade in on scroll */
.float                   /* Float animation */
.pulse                   /* Pulse effect */
.glow                    /* Glow effect */
.slideInLeft            /* Slide in from left */
.slideInRight           /* Slide in from right */
```

---

## ✅ Pre-commit Checklist

- [ ] Code runs without errors
- [ ] No console warnings/errors
- [ ] Updated documentation
- [ ] Tested on mobile view
- [ ] Committed with clear message
- [ ] All files saved

---

## 📞 Quick Fixes

### Node Modules Issue
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Cmd+Shift+R on Mac)
- Or clear cache in DevTools

---

**Happy Coding! 🚀**

For detailed information, see:
- `README.md` - Full documentation
- `GETTING_STARTED.md` - Setup guide
- `PROJECT_SUMMARY.md` - Project overview
