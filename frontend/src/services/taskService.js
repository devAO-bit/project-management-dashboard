import api from './api';

export const taskService = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/tasks?${params}`);
        return response.data.data;
    },

    create: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data.data;
    },

    update: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },

    addComment: async (id, comment) => {
        const response = await api.post(`/tasks/${id}/comments`, comment);
        return response.data.data;
    }
};