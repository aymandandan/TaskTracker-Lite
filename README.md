# TaskTracker Lite

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, task CRUD operations, filtering, and theming.

## ✨ Features

- **User Authentication**
  - Register and login with email and password
  - JWT-based authentication
  - Protected routes

- **Task Management**
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Filter and sort tasks
  - Responsive design for all devices

- **UI/UX**
  - Clean and modern interface
  - Dark/light theme support
  - Intuitive navigation
  - Real-time feedback

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tasktracker-lite.git
   cd tasktracker-lite
   ```

2. **Set up the backend**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your configuration
   npm install
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   cp .env.example .env
   # Edit .env with your API URL
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
tasktracker-lite/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable UI components
│       ├── context/        # React context providers
│       ├── hooks/          # Custom React hooks
│       ├── pages/          # Page components
│       ├── services/       # API services
│       └── utils/          # Utility functions
├── server/                 # Backend Express server
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── utils/             # Utility functions
├── .eslintrc.js           # ESLint configuration
└── .prettierrc            # Prettier configuration
```

## 🔧 Environment Variables

### Server (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Client (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
NODE_ENV=development
```

## 🛠 Built With

- **Frontend**
  - React.js
  - React Router
  - Tailwind CSS
  - Axios
  - React Hook Form
  - React Hot Toast

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Express Validator

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Date-fns](https://date-fns.org/)
