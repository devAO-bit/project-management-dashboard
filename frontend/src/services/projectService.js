import api from './api';

export const projectService = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/projects?${params}`);
        return response.data.data;
    },

    getById: async (id) => {
        const response = await api.get(`/projects/${id}`);
        return response.data.data;
    },

    create: async (projectData) => {
        const response = await api.post('/projects', projectData);
        return response.data.data;
    },

    update: async (id, projectData) => {
        const response = await api.put(`/projects/${id}`, projectData);
        return response.data.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    },

    addTeamMember: async (id, memberData) => {
        const response = await api.post(`/projects/${id}/team`, memberData);
        return response.data.data;
    },

    getAnalytics: async (id) => {
        const response = await api.get(`/projects/${id}/analytics`);
        return response.data.data;
    }
};
