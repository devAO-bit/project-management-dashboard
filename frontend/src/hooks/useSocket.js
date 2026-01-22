import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import socketService from '../services/socketService';

export const useSocket = () => {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      socketService.connect(token);
    }

    return () => {
      socketService.disconnect();
    };
  }, [token]);

  return socketService;
};