const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res, next) => {
    try {
        const { status, priority, search } = req.query;

        let query = {};

        // Filter by user role
        if (req.user.role !== 'admin') {
            query.$or = [
                { owner: req.user.id },
                { 'team.user': req.user.id }
            ];
        }

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const projects = await Project.find(query)
            .populate('owner', 'name email avatar')
            .populate('team.user', 'name email avatar')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner', 'name email avatar')
            .populate('team.user', 'name email avatar')
            .populate({
                path: 'tasks',
                populate: {
                    path: 'assignedTo',
                    select: 'name email avatar'
                }
            });

        if (!project) {
            return next(new ErrorResponse('Project not found', 404));
        }

        // Check access
        if (
            req.user.role !== 'admin' &&
            project.owner._id.toString() !== req.user.id &&
            !project.team.some(t => t.user._id.toString() === req.user.id)
        ) {
            return next(new ErrorResponse('Not authorized to access this project', 403));
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
    try {
        req.body.owner = req.user.id;

        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            data: project
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return next(new ErrorResponse('Project not found', 404));
        }

        // Check ownership or admin
        if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized to update this project', 403));
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return next(new ErrorResponse('Project not found', 404));
        }

        if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized to delete this project', 403));
        }

        // Delete all tasks associated with project
        await Task.deleteMany({ project: req.params.id });

        await project.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Add team member to project
// @route   POST /api/projects/:id/team
// @access  Private
exports.addTeamMember = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return next(new ErrorResponse('Project not found', 404));
        }

        if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse('Not authorized', 403));
        }

        const { userId, role } = req.body;

        // Check if user already in team
        if (project.team.some(t => t.user.toString() === userId)) {
            return next(new ErrorResponse('User already in team', 400));
        }

        project.team.push({ user: userId, role });
        await project.save();

        await project.populate('team.user', 'name email avatar');

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get project analytics
// @route   GET /api/projects/:id/analytics
// @access  Private
exports.getProjectAnalytics = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return next(new ErrorResponse('Project not found', 404));
        }

        const tasks = await Task.find({ project: req.params.id });

        const analytics = {
            totalTasks: tasks.length,
            completedTasks: tasks.filter(t => t.status === 'done').length,
            inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
            todoTasks: tasks.filter(t => t.status === 'todo').length,
            overdueTasks: tasks.filter(t => t.dueDate && t.dueDate < new Date() && t.status !== 'done').length,
            totalEstimatedHours: tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0),
            totalActualHours: tasks.reduce((sum, t) => sum + (t.actualHours || 0), 0),
            progress: project.progress
        };

        res.status(200).json({
            success: true,
            data: analytics
        });
    } catch (err) {
        next(err);
    }
};