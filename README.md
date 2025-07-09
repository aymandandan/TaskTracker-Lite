# TaskTracker Lite

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, task CRUD operations, filtering, sorting, and theming. This application helps users manage their tasks efficiently with a clean, responsive interface and secure authentication.

## ✨ Features

- **User Authentication**
  - Secure registration and login with email and password
  - JWT-based authentication with HTTP-only cookies
  - Password reset functionality
  - Protected routes and role-based access control
  - Session management

- **Task Management**
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete with timestamps
  - Filter tasks by status, priority, and due date
  - Search functionality across task titles and descriptions

- **User Interface**
  - Responsive design that works on all devices
  - Dark/light theme support with system preference detection
  - Intuitive and accessible interface
  - Loading states and skeleton loaders
  - Form validation and error handling

- **Performance**
  - Optimized bundle size
  - Code splitting and lazy loading
  - Efficient API calls with proper caching

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later) or yarn (v1.22 or later)
- MongoDB Atlas account or local MongoDB instance (v5.0 or later)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tasktracker-lite.git
   cd taskTracker-Lite
   ```

2. **Set up the backend**
   ```bash
   # Navigate to server directory
   cd server
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your configuration
   
   # Start development server
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   # Navigate to client directory
   cd ../client
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your API URL (default: http://localhost:5000/api)
   
   # Start development server
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs (if Swagger is enabled)

## 🔧 Environment Variables

### Server (.env)

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRES_IN=30d
JWT_COOKIE_EXPIRES_IN=30
DOMAIN=.example.com

# Email (for password reset)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=TaskTracker <noreply@tasktracker.com>

# Frontend URL (for CORS and email templates)
FRONTEND_URL=http://localhost:3000
```

### Client (.env)

Create a `.env` file in the `client` directory with the following variables:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Environment
NODE_ENV=development
```

> **Note**: Never commit `.env` files to version control. They are included in `.gitignore` by default.

## 🛠 Built With

### Frontend
- **Core**
  - React 18
  - React Router DOM v6
  - Context API for state management
  - React Hooks

- **UI & Styling**
  - Tailwind CSS v3
  - Headless UI
  - Hero Icons

- **Forms & Validation**
  - React Hook Form

- **HTTP Client**
  - Axios for API requests

### Backend
- **Runtime & Framework**
  - Node.js
  - Express.js
  - CORS for cross-origin requests
  - Compression for response compression

- **Database**
  - MongoDB with Mongoose ODM
  - MongoDB Atlas for cloud database

- **Authentication & Security**
  - JWT (JSON Web Tokens)
  - bcrypt for password hashing
  - Express Rate Limit for API rate limiting
  - Express Validator for request validation
  - Express Mongo Sanitize for NoSQL injection prevention
  - XSS protection

- **Development Tools**
  - Nodemon for development
  - ESLint + Prettier for code quality
  - Jest + Supertest for testing
  - Swagger/OpenAPI for API documentation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) - For bootstrapping the React application
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - For beautiful icons
- [Date-fns](https://date-fns.org/) - For date manipulation
- [Express.js](https://expressjs.com/) - For the backend framework
- [MongoDB](https://www.mongodb.com/) - For the database
- [JWT](https://jwt.io/) - For authentication
