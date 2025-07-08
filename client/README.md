# TaskTracker Lite - Frontend

This is the frontend for TaskTracker Lite, a full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The frontend is built with React 18 and features a responsive design with dark/light theme support.

## ✨ Features

- **User Authentication**
  - Secure login and registration
  - JWT-based authentication with HTTP-only cookies
  - Protected routes and role-based access
  - Password reset functionality

- **Task Management**
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Filter and sort tasks by various criteria
  - Search functionality across tasks

- **User Interface**
  - Responsive design for all screen sizes
  - Dark/light theme with system preference detection
  - Intuitive and accessible interface
  - Toast notifications for user feedback
  - Loading states and skeleton loaders

- **Performance**
  - Code splitting and lazy loading
  - Optimized bundle size
  - Efficient data fetching with React Query
  - Memoized components for better performance

## 🚀 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn (v1.22 or higher)
- Backend server running (see [server/README.md](../server/README.md) for setup)
- Git

## 🛠️ Setup Instructions

1. **Clone the repository** (if you haven't already)
   ```bash
   git clone https://github.com/yourusername/tasktracker-lite.git
   cd tasktracker-lite/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the client directory with the following variables:
   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   
   # Environment
   NODE_ENV=development
   
   # Optional: Google Analytics (if implemented)
   REACT_APP_GA_TRACKING_ID=your_ga_tracking_id
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This will start the development server at [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```
   This will create an optimized production build in the `build` folder.

## 🚀 Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production to the `build` folder
- `npm run lint` - Runs ESLint to check for code quality issues
- `npm run lint:fix` - Automatically fixes linting issues where possible
- `npm run format` - Formats code using Prettier
- `npm run analyze` - Analyzes the bundle size (if configured)

## 📁 Project Structure

```
src/
  ├── assets/             # Static assets (images, fonts, etc.)
  │
  ├── components/         # Reusable UI components
  │   ├── auth/          # Authentication related components
  │   ├── common/        # Common UI components (buttons, modals, etc.)
  │   ├── layout/        # Layout components (header, footer, sidebar)
  │   └── tasks/         # Task related components
  │
  ├── context/           # React context providers
  │   ├── AuthContext.js # Authentication context
  │   └── ThemeContext.js # Theme context
  │
  ├── hooks/             # Custom React hooks
  │   ├── useAuth.js     # Authentication hook
  │   └── useTheme.js    # Theme hook
  │
  ├── pages/             # Page components
  │   ├── auth/         # Authentication pages
  │   ├── dashboard/    # Dashboard pages
  │   └── tasks/        # Task management pages
  │
  ├── services/          # API services and data fetching
  │   ├── api.js        # Axios instance and interceptors
  │   └── taskService.js # Task-related API calls
  │
  ├── styles/            # Global styles and theme
  │   ├── index.css     # Global styles
  │   └── theme.js      # Theme configuration
  │
  └── utils/             # Utility functions
      ├── validators.js  # Form validation utilities
      └── helpers.js     # Helper functions
```

## 🛠️ Tech Stack

### Core
- React 18
- React Router DOM v6
- React Query (for data fetching and caching)
- Axios (HTTP client)

### Styling
- Tailwind CSS v3
- Headless UI (accessible UI components)
- Hero Icons
- React Hot Toast (notifications)

### Forms & Validation
- React Hook Form
- Zod (schema validation)
- Yup (form validation)

### State Management
- React Context API
- React Hooks

### Development Tools
- ESLint (code linting)
- Prettier (code formatting)
- Husky (Git hooks)
- Jest + React Testing Library (testing)
- Vite (build tool)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

Run tests with coverage report:

```bash
npm test -- --coverage
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `build` folder.

## 🔍 Code Analysis

### Bundle Analysis

To analyze the bundle size:

```bash
npm run analyze
# or
yarn analyze
```

This will generate a visual representation of your bundle size.

### Performance Monitoring

- Use React DevTools Profiler to identify performance bottlenecks
- Implement code splitting with React.lazy() and Suspense
- Use React.memo() for expensive component re-renders
- Optimize images and assets

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) - For bootstrapping the React application
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - For beautiful icons
- [React Query](https://tanstack.com/query) - For server state management
- [Vite](https://vitejs.dev/) - For fast development and building

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
