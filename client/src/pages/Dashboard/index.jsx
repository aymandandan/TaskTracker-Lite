import React from 'react';
import TaskList from '../../components/tasks/TaskList';

const Dashboard = () => {
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
            My Tasks
          </h2>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
