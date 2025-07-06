const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const User = require('../Models/User');

// Test user data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'test1234',
};

// Database connection before tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear database after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication System', () => {
  describe('User Registration', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user).toHaveProperty('_id');
      expect(response.body.data.user.username).toBe(testUser.username);
      expect(response.body.data.user.email).toBe(testUser.email);
      expect(response.body.token).toBeDefined();
    });

    it('should not register a user with an existing email', async () => {
      // First registration
      await request(app).post('/api/auth/register').send(testUser);
      
      // Second registration with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          ...testUser,
          username: 'differentusername'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('already exists');
    });

    it('should not register a user with invalid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'ab', // Too short
          email: 'invalid-email', // Invalid email
          password: '12345' // Too short
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe('error');
      expect(Array.isArray(response.body.errors)).toBe(true);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      // Register a test user before login tests
      await request(app).post('/api/auth/register').send(testUser);
    });

    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user.email).toBe(testUser.email);
      expect(response.body.token).toBeDefined();
    });

    it('should not login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('Incorrect email or password');
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        });

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toContain('Incorrect email or password');
    });
  });

  describe('Get Current User', () => {
    let authToken;

    beforeEach(async () => {
      // Register and login a test user
      await request(app).post('/api/auth/register').send(testUser);
      
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      authToken = loginResponse.body.token;
    });

    it('should get current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.user.email).toBe(testUser.email);
    });

    it('should not get current user without token', async () => {
      const response = await request(app)
        .get('/api/auth/me');

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
    });

    it('should not get current user with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken');

      expect(response.statusCode).toBe(401);
      expect(response.body.status).toBe('error');
    });
  });
});
