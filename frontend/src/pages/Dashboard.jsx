import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useTasks } from '../hooks/useTasks';
import { useAuthStore } from '../store/authStore';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { FolderKanban, CheckSquare, Users, TrendingUp, Calendar } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { format } from 'date-fns';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: tasks = [], isLoading: tasksLoading } = useTasks();

  if (projectsLoading || tasksLoading) {
    return <LoadingSpinner fullScreen />;
  }

  const projectsByStatus = [
    { name: 'Active', value: projects.filter(p => p.status === 'active').length },
    { name: 'Planning', value: projects.filter(p => p.status === 'planning').length },
    { name: 'On Hold', value: projects.filter(p => p.status === 'on-hold').length },
    { name: 'Completed', value: projects.filter(p => p.status === 'completed').length },
  ].filter(item => item.value > 0);

  const tasksByStatus = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
    { name: 'Review', value: tasks.filter(t => t.status === 'review').length },
    { name: 'Done', value: tasks.filter(t => t.status === 'done').length },
  ];

  const myTasks = tasks.filter(t => 
    t.assignedTo?.some(assignee => assignee._id === user?.id)
  );

  const stats = [
    {
      name: 'Total Projects',
      value: projects.length,
      icon: FolderKanban,
      color: 'bg-blue-500',
      link: '/projects',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'My Tasks',
      value: myTasks.length,
      icon: CheckSquare,
      color: 'bg-green-500',
      link: '/tasks',
      change: '+5',
      changeType: 'increase'
    },
    {
      name: 'Team Members',
      value: new Set(projects.flatMap(p => p.team?.map(t => t.user?._id) || [])).size,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      name: 'Completion Rate',
      value: `${tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+8%',
      changeType: 'increase'
    },
  ];

  const upcomingDeadlines = tasks
    .filter(t => t.dueDate && new Date(t.dueDate) > new Date() && t.status !== 'done')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/projects" className="btn-primary">
            New Project
          </Link>
          <Link to="/tasks" className="btn-secondary">
            View All Tasks
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const Component = stat.link ? Link : 'div';
          
          return (
            <Component
              key={stat.name}
              to={stat.link || '#'}
              className="card hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  {stat.change && (
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last week</span>
                    </div>
                  )}
                </div>
                <div className={`${stat.color} rounded-xl p-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Component>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects by Status</h3>
          {projectsByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No projects yet
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tasksByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
            <Link to="/projects" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">
                        {project.team?.length || 0} members
                      </span>
                      <span className="text-xs text-gray-500">
                        {project.progress || 0}% complete
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'on-hold' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </Link>
            ))}
            {projects.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <FolderKanban className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No projects yet. Create your first project!</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((task) => (
              <div
                key={task._id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
            {upcomingDeadlines.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming deadlines</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;