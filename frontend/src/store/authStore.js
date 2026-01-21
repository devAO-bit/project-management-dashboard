import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    login: async (credentials) => {
        try {
            set({ loading: true, error: null });
            const data = await authService.login(credentials);
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                loading: false
            });
            return data;
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },
    register: async (userData) => {
        try {
            set({ loading: true, error: null });
            const data = await authService.register(userData);
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                loading: false
            });
            return data;
        } catch (error) {
            set({ loading: false, error: error.message });
            throw error;
        }
    },
    logout: () => {
        authService.logout();
        set({
            user: null,
            token: null,
            isAuthenticated: false
        });
    },

    updateUser: (userData) => {
        set({ user: userData });
    }
}));