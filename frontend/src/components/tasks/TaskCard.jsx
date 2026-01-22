import React from 'react';
import { format } from 'date-fns';
import { Calendar, User, MessageSquare } from 'lucide-react';

const TaskCard = ({ task }) => {
  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="space-y-3">
        {/* Title */}
        <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
        
        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
        )}

        {/* Priority Badge */}
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>

        {/* Meta Info */}
        <div className="space-y-2 pt-3 border-t border-gray-200">
          {task.dueDate && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Due {format(new Date(task.dueDate), 'MMM dd')}</span>
            </div>
          )}
          
          {task.assignedTo && task.assignedTo.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <User className="w-4 h-4" />
              <span>{task.assignedTo[0].name}</span>
              {task.assignedTo.length > 1 && (
                <span className="text-gray-400">+{task.assignedTo.length - 1}</span>
              )}
            </div>
          )}

          {task.comments && task.comments.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MessageSquare className="w-4 h-4" />
              <span>{task.comments.length} comments</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;