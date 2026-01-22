import React, { useState } from 'react';
import { useTasks, useCreateTask, useUpdateTask } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import { Plus, Search, CheckSquare } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { format } from 'date-fns';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import TaskCard from '../components/tasks/TaskCard';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filters = {};
  if (statusFilter !== 'all') filters.status = statusFilter;
  if (priorityFilter !== 'all') filters.priority = priorityFilter;

  const { data: tasks = [], isLoading } = useTasks(filters);
  const { data: projects = [] } = useProjects();

  const filteredTasks = tasks.filter(task => {
    if (!searchTerm) return true;
    return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           task.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Group tasks by status for Kanban view
  const tasksByStatus = {
    'todo': filteredTasks.filter(t => t.status === 'todo'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    'review': filteredTasks.filter(t => t.status === 'review'),
    'done': filteredTasks.filter(t => t.status === 'done'),
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all your tasks
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="flex flex-col">
            {/* Column Header */}
            <div className="card mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 capitalize">
                  {status.replace('-', ' ')}
                </h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                  {statusTasks.length}
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3 flex-1">
              {statusTasks.length === 0 ? (
                <div className="card text-center py-8 text-gray-400">
                  <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No tasks</p>
                </div>
              ) : (
                statusTasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          projects={projects}
        />
      )}
    </div>
  );
};

export default Tasks;

