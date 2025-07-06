# TaskTracker Lite - Frontend

This is the frontend for TaskTracker Lite, a full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (login/register)
- JWT-based authentication
- Responsive design
- Dark mode
- Task management (coming soon)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Backend server running (see server/README.md for setup)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TaskTracker-Lite/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root of the client directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This will start the development server at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── context/       # React context providers
  ├── hooks/         # Custom React hooks
  ├── pages/         # Page components
  ├── services/      # API services
  ├── styles/        # Global styles
  └── utils/         # Utility functions
```

## Tech Stack

- React 18
- React Router 6
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast
- React Hook Form
- Zod
- Vite

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
