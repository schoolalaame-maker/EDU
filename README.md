# LinguaX - Modern Language Learning Platform

A cutting-edge, AI-powered language learning platform built with a modern tech stack. LinguaX provides an immersive learning experience with interactive lessons, adaptive quizzes, and personalized learning paths.

## 🚀 Features

- **Modern Dark UI** - Futuristic interface with glassmorphism effects
- **Interactive Lessons** - Engaging and interactive language lessons
- **Adaptive Quizzes** - Smart quizzes that adapt to your learning pace
- **Multiple Languages** - Support for major world languages
- **User Authentication** - Secure JWT-based authentication
- **Progress Tracking** - Real-time progress monitoring and analytics
- **Responsive Design** - Seamless experience on all devices
- **RESTful API** - Scalable backend architecture

## 💻 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Glassmorphism effects
- **JavaScript (ES6+)** - Interactive dynamic frontend
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Lightweight web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication & Authorization

## 📁 Project Structure

```
LinguaX/
├── client/                 # Frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── assets/        # Images and icons
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page templates
│   │   ├── styles/        # Global and component styles
│   │   └── js/            # JavaScript functionality
│   └── package.json
│
├── server/                # Backend API
│   ├── src/
│   │   ├── auth/          # Authentication logic
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── database/      # Database initialization
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Helper functions
│   │   └── server.js      # Entry point
│   └── package.json
│
├── .gitignore
├── package.json           # Root package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/linguax/linguax.git
cd LinguaX
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Environment Variables**

Create `.env` file in the `server/` directory:
```
MONGODB_URI=mongodb://localhost:27017/linguax
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

4. **Run the application**

Development mode (both client and server):
```bash
npm run dev
```

Or run separately:
```bash
npm run server    # Terminal 1
npm run client    # Terminal 2
```

## 🏗️ Architecture

### Clean Architecture Principles
- **Separation of Concerns** - Each module has a single responsibility
- **Modularity** - Independent, reusable components
- **Scalability** - Easy to add new features
- **Maintainability** - Clean, well-documented code

### Design Patterns
- **MVC Pattern** - Controllers handle business logic
- **Repository Pattern** - Data access abstraction
- **Middleware Pattern** - Request/response processing
- **Component Pattern** - Reusable UI components

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token

### User Endpoints

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/progress` - Get learning progress

### Lessons Endpoints

- `GET /lessons` - Get all lessons
- `GET /lessons/:id` - Get lesson details
- `POST /lessons/:id/complete` - Mark lesson as complete

### Progress Endpoints

- `GET /progress` - Get user progress
- `POST /progress/update` - Update progress

## 🎨 Design System

### Color Palette
- **Background**: `#0f172a` - Deep navy
- **Primary**: `#7c3aed` - Vibrant purple
- **Secondary**: `#22c55e` - Fresh green
- **Text**: `#ffffff` - Clean white
- **Glass**: `rgba(255, 255, 255, 0.1)` - Glassmorphism

### Typography
- **Headings**: Bold weights for hierarchy
- **Body**: Clean, readable sans-serif
- **Code**: Monospace for technical content

### Components
- **Buttons** - Animated with hover effects
- **Cards** - Glassmorphic design
- **Input Fields** - Modern styling with validation
- **Navigation** - Sticky header with smooth scrolling

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for password security
- **CORS** - Cross-Origin Resource Sharing protection
- **Helmet.js** - Security headers
- **Input Validation** - Express-validator for data validation
- **Environment Variables** - Secure credential management

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  profilePicture: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Lesson Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  language: String,
  difficulty: String,
  content: Object,
  imageUrl: String,
  createdAt: Date
}
```

## 🚀 Deployment

### Frontend
- Deploy to Netlify, Vercel, or GitHub Pages
- Build: `npm run build`

### Backend
- Deploy to Heroku, AWS, or DigitalOcean
- Ensure MongoDB Atlas credentials
- Set environment variables on hosting platform

## 📝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🤝 Support

For support, email support@linguax.com or open an issue on GitHub.

---

**Made with ❤️ by the LinguaX Team**
