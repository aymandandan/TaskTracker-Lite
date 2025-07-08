import { tasksAPI } from './api';

/**
 * Create a new task
 * @param {Object} taskData - Task data including title, description, dueDate, priority
 * @returns {Promise<Object>} The created task
 */
export const createTask = async (taskData) => {
  try {
    const response = await tasksAPI.create(taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error.response?.data || { message: 'Failed to create task' };
  }
};

/**
 * Get all tasks for the current user
 * @param {Object} filters - Optional filters like completed status
 * @returns {Promise<Array>} Array of tasks
 */
export const getTasks = async (filters = {}) => {
  try {
    const response = await tasksAPI.get(filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error.response?.data || { message: 'Failed to fetch tasks' };
  }
};

/**
 * Update an existing task
 * @param {string} taskId - ID of the task to update
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} The updated task
 */
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await tasksAPI.update(taskId, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error.response?.data || { message: 'Failed to update task' };
  }
};

/**
 * Toggle task completion status
 * @param {string} taskId - ID of the task to toggle completion
 * @returns {Promise<Object>} The updated task
 */
export const toggleTaskCompletion = async (taskId) => {
  try {
    const response = await tasksAPI.toggleCompletion(taskId);
    return response.data;
  } catch (error) {
    console.error('Error toggling task completion:', error);
    throw error.response?.data || { message: 'Failed to toggle task completion' };
  }
};

/**
 * Delete a task
 * @param {string} taskId - ID of the task to delete
 * @returns {Promise<Object>} The deleted task
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await tasksAPI.delete(taskId);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error.response?.data || { message: 'Failed to delete task' };
  }
};
