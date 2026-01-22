import { io } from 'socket.io-client';

class SocketService {
  socket = null;
  listeners = new Map();

  connect(token) {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    this.socket = io(socketUrl, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.listeners.clear();
    }
  }

  joinProject(projectId) {
    if (this.socket) {
      this.socket.emit('join_project', projectId);
    }
  }

  leaveProject(projectId) {
    if (this.socket) {
      this.socket.emit('leave_project', projectId);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
      
      // Store reference for cleanup
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push(callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
      
      // Remove from stored listeners
      if (this.listeners.has(event)) {
        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Specific event emitters
  emitTaskUpdate(projectId, task) {
    this.emit('task_update', { projectId, task });
  }

  emitProjectUpdate(projectId, project) {
    this.emit('project_update', { projectId, project });
  }

  emitNewComment(projectId, taskId, comment) {
    this.emit('new_comment', { projectId, taskId, comment });
  }

  emitTyping(projectId, taskId) {
    this.emit('typing', { projectId, taskId });
  }
}

export default new SocketService();
