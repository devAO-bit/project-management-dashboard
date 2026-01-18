const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin', 'manager'), async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        next(err);
    }
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', protect, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;