import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { toast } from 'react-toastify';

export const useProjects = (filters) => {
    return useQuery({
        queryKey: ['projects', filters],
        queryFn: () => projectService.getAll(filters),
        staleTime: 30000,
    });
};

export const useProject = (id) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: () => projectService.getById(id),
        enabled: !!id,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: projectService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project created successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || 'Failed to create project');
        }
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => projectService.update(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['project', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project updated successfully');
        },
        onError: () => {
            toast.error('Failed to update project');
        }
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: projectService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete project');
        }
    });
};

export const useProjectAnalytics = (id) => {
    return useQuery({
        queryKey: ['project-analytics', id],
        queryFn: () => projectService.getAnalytics(id),
        enabled: !!id,
    });
};