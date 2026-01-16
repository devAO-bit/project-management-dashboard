// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
    try {
        const { project, status, priority, assignedTo } = req.query;

        let query = {};

        if (project) query.project = project;
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (assignedTo) query.assignedTo = assignedTo;

        // Filter by user role
        if (req.user.role !== 'admin') {
            query.$or = [
                { createdBy: req.user.id },
                { assignedTo: req.user.id }
            ];
        }

        const tasks = await Task.find(query)
            .populate('project', 'name')
            .populate('assignedTo', 'name email avatar')
            .populate('createdBy', 'name email avatar')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
    try {
        req.body.createdBy = req.user.id;

        const task = await Task.create(req.body);

        await task.populate('assignedTo', 'name email avatar');
        await task.populate('project', 'name');

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .populate('assignedTo', 'name email avatar')
            .populate('project', 'name');

        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
// @access  Private
exports.addComment = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }

        task.comments.push({
            user: req.user.id,
            text: req.body.text
        });

        await task.save();
        await task.populate('comments.user', 'name email avatar');

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (err) {
        next(err);
    }
};