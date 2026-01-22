import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useProject, useProjectAnalytics } from '../hooks/useProjects';
import { useSocket } from '../hooks/useSocket';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-toastify';

const ProjectDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const socket = useSocket();
  const { data: project, isLoading } = useProject(id);
  const { data: analytics } = useProjectAnalytics(id);

  useEffect(() => {
    if (!id) return;

    // Join project room
    socket.joinProject(id);

    // Listen for real-time updates
    const handleTaskUpdate = (data) => {
      toast.info(`Task updated by ${data.updatedBy || 'team member'}`);
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    };

    const handleProjectUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
    };

    const handleCommentAdded = (data) => {
      toast.info(`New comment by ${data.user}`);
      queryClient.invalidateQueries({ queryKey: ['project', id] });
    };

    socket.on('task_updated', handleTaskUpdate);
    socket.on('project_updated', handleProjectUpdate);
    socket.on('comment_added', handleCommentAdded);

    // Cleanup
    return () => {
      socket.off('task_updated', handleTaskUpdate);
      socket.off('project_updated', handleProjectUpdate);
      socket.off('comment_added', handleCommentAdded);
      socket.leaveProject(id);
    };
  }, [id, socket, queryClient]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-gray-600 mt-2">{project.description}</p>
        
        {analytics && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold">{analytics.totalTasks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{analytics.completedTasks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.inProgressTasks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-indigo-600">{analytics.progress}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;