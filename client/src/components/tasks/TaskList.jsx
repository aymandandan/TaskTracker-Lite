import { useState, useCallback, useEffect } from 'react';
import { format, parseISO, isPast, isToday } from 'date-fns';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import TaskForm from './TaskForm';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from '../../services/taskService';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingTasks, setUpdatingTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter and sort state
  const [filters, setFilters] = useState({
    status: 'all', // all, completed, active
    priority: 'all', // all, low, medium, high
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('dueDate:asc'); // dueDate:asc, dueDate:desc, priority:asc, priority:desc

  const fetchTasks = useCallback(async () => {
    try {
      console.log("fetchTasks");
      setLoading(true);
      console.log("sortOption: ", sortOption);
      const [sortField, sortOrder] = sortOption.split(':');
      console.log("sortField: ", sortField);
      console.log("sortOrder: ", sortOrder);
      const params = {
        ...(filters.status !== 'all' && { completed: filters.status === 'completed' }),
        ...(filters.priority !== 'all' && { priority: filters.priority }),
        ...(appliedSearchQuery && { search: appliedSearchQuery }),
        sortBy: `${sortField}:${sortOrder}`
      };
      console.log("params: ", params);
      const response = await getTasks(params);
      setTasks(response.data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filters, appliedSearchQuery, sortOption]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle search submission
  const handleSearch = (e) => {
    e?.preventDefault();
    setAppliedSearchQuery(searchQuery);
  };

  // Handle pressing Enter in search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  const handleEditClick = (task) => {
    setEditingTask({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
    setShowTaskForm(true);
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      setIsSubmitting(true);
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(taskData);
      }
      await fetchTasks();
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
  };

  const handleToggleComplete = async (task) => {
    try {
      setUpdatingTasks(prev => new Set([...prev, task._id]));
      const updatedTask = await toggleTaskCompletion(task._id);
      setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    } catch (error) {
      console.error('Error toggling task completion:', error);
      setError(error.message || 'Failed to update task status');
    } finally {
      setUpdatingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(task._id);
        return newSet;
      });
    }
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    
    try {
      setIsDeleting(true);
      await deleteTask(taskToDelete._id);
      setTasks(tasks.filter(task => task._id !== taskToDelete._id));
      setTaskToDelete(null);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err.message || 'Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const getDueDateStatus = (dueDate) => {
    const date = parseISO(dueDate);
    if (isPast(date) && !isToday(date)) {
      return 'Overdue';
    }
    if (isToday(date)) {
      return 'Today';
    }
    return format(date, 'MMM d, yyyy');
  };

  const getDueDateClass = (dueDate) => {
    const date = parseISO(dueDate);
    if (isPast(date) && !isToday(date)) {
      return 'text-red-600 dark:text-red-400';
    }
    if (isToday(date)) {
      return 'text-green-600 dark:text-green-400 font-medium';
    }
    return 'text-gray-600 dark:text-gray-400';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
          <button
            onClick={() => {
              setEditingTask(null);
              setShowTaskForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto justify-center"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Task
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-md h-10"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                Search
              </button>
            </form>
            
            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            {/* Priority Filter */}
            <div>
              <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                id="priority-filter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            {/* Sort */}
            <div>
              <label htmlFor="sort-option" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort By
              </label>
              <select
                id="sort-option"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="dueDate:asc">Due Date (Earliest First)</option>
                <option value="dueDate:desc">Due Date (Latest First)</option>
                <option value="priority:desc">Priority (High to Low)</option>
                <option value="priority:asc">Priority (Low to High)</option>
              </select>
            </div>
          </div>
          
          {/* Active Filters */}
          {(filters.status !== 'all' || filters.priority !== 'all' || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.status !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {filters.status === 'completed' ? 'Completed' : 'Active'}
                  <button
                    type="button"
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 dark:hover:bg-blue-800"
                    onClick={() => setFilters({...filters, status: 'all'})}
                  >
                    <span className="sr-only">Remove status filter</span>
                    <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                      <path fillRule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {filters.priority !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {filters.priority.charAt(0).toUpperCase() + filters.priority.slice(1)} Priority
                  <button
                    type="button"
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500 dark:hover:bg-purple-800"
                    onClick={() => setFilters({...filters, priority: 'all'})}
                  >
                    <span className="sr-only">Remove priority filter</span>
                    <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                      <path fillRule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {appliedSearchQuery && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Search: {appliedSearchQuery}
                  <button
                    type="button"
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 dark:hover:bg-green-800"
                    onClick={() => {
                      setSearchQuery('');
                      setAppliedSearchQuery('');
                    }}
                  >
                    <span className="sr-only">Remove search</span>
                    <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                      <path fillRule="evenodd" d="M4 3.293l2.146-2.147a.5.5 0 01.708.708L4.707 4l2.147 2.146a.5.5 0 01-.708.708L4 4.707l-2.146 2.147a.5.5 0 01-.708-.708L3.293 4 1.146 1.854a.5.5 0 01.708-.708L4 3.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              <button
                type="button"
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-1"
                onClick={() => {
                  setFilters({ status: 'all', priority: 'all' });
                  setSearchQuery('');
                  setAppliedSearchQuery('');
                }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 shadow rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new task.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowTaskForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              New Task
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((task) => (
              <li key={task._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task)}
                        disabled={updatingTasks.has(task._id)}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                          updatingTasks.has(task._id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      />
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          <span className={`text-xs ${getDueDateClass(task.dueDate)}`}>
                            {getDueDateStatus(task.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditClick(task)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        title="Edit task"
                        disabled={isDeleting}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(task)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                        title="Delete task"
                        disabled={isDeleting}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showTaskForm && (
        <TaskForm 
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }} 
          onSubmit={handleTaskSubmit}
          initialData={editingTask}
          isSubmitting={isSubmitting}
        />
      )}
      
      <ConfirmationDialog
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default TaskList;
