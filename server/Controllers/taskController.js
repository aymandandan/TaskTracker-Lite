const Task = require('../Models/Task');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

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

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, dueDate, priority, completed } = req.body;

    // Check if task exists and belongs to the user
    let task = await Task.findOne({ _id: id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized'
      });
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;

    // Save the updated task
    const updatedTask = await task.save();
    await updatedTask.populate('owner', 'username email');

    res.status(200).json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to the user
    const task = await Task.findOne({ _id: id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not authorized'
      });
    }

    // Delete the task (hard delete)
    await Task.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: { id }
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
