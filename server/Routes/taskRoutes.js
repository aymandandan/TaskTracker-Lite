const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../Middlewares/auth');
const taskController = require('../Controllers/taskController');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('dueDate', 'Due date is required').isISO8601(),
      check('priority', 'Priority is required').isIn(['low', 'medium', 'high'])
    ]
  ],
  taskController.createTask
);

// @route   GET /api/tasks
// @desc    Get all tasks for the authenticated user
// @access  Private
router.get('/', auth, taskController.getTasks);

// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', auth, taskController.getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('title', 'Title is required').optional().not().isEmpty(),
      check('description', 'Description is required').optional().not().isEmpty(),
      check('dueDate', 'Invalid date').optional().isISO8601(),
      check('priority', 'Invalid priority').optional().isIn(['low', 'medium', 'high']),
      check('completed', 'Completed must be a boolean').optional().isBoolean()
    ]
  ],
  taskController.updateTask
);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, taskController.deleteTask);

// @route   PATCH /api/tasks/:id/complete
// @desc    Toggle task completion status
// @access  Private
router.patch('/:id/complete', auth, taskController.toggleTaskCompletion);

module.exports = router;
