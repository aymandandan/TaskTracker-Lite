const Task = require('../Models/Task');
const { validationResult } = require('express-validator');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate, priority } = req.body;
    
    // Create new task
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || 'medium',
      owner: req.user.id
    });

    // Populate owner details
    await task.populate('owner', 'username email');

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    // Build query
    const query = { owner: req.user.id };
    
    // Filter by completion status if provided
    if (req.query.completed) {
      query.completed = req.query.completed === 'true';
    }

    // Execute query
    const tasks = await Task.find(query)
      .sort({ dueDate: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
