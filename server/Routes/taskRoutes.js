const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../Middlewares/authMiddleware');
const {
  createTask,
  getTasks,
} = require('../Controllers/taskController');

// Apply protect middleware to all routes
router.use(protect);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty().trim().escape(),
    check('description', 'Description is too long').optional().trim().escape().isLength({ max: 1000 }),
    check('dueDate', 'Please provide a valid due date').isISO8601().toDate(),
    check('priority', 'Priority must be low, medium, or high').optional().isIn(['low', 'medium', 'high'])
  ],
  createTask
);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
router.get('/', getTasks);

module.exports = router;
