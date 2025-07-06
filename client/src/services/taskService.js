import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Create a new task
 * @param {Object} taskData - Task data including title, description, dueDate, priority
 * @returns {Promise<Object>} The created task
 */
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, { withCredentials: true });
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
    const response = await axios.get(`${API_BASE_URL}/tasks`, {
      params: filters,
      withCredentials: true,
    });
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
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${taskId}`,
      taskData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error.response?.data || { message: 'Failed to update task' };
  }
};

/**
 * Delete a task
 * @param {string} taskId - ID of the task to delete
 * @returns {Promise<Object>} The deleted task
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error.response?.data || { message: 'Failed to delete task' };
  }
};
