// Load environment variables for tests
require('dotenv').config({ path: '.env.test' });

// Mock console methods to keep test output clean
const originalConsole = { ...console };

beforeAll(() => {
  // Mock console methods
  global.console = {
    ...originalConsole,
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  };
});

afterEach(() => {
  // Clear all mocks after each test
  jest.clearAllMocks();
});

afterAll(() => {
  // Restore original console methods
  global.console = originalConsole;
});

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_EXPIRES_IN = '1h';
process.env.MONGODB_URI = 'mongodb://localhost:27017/tasktracker-test';

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
