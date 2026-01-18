const express = require('express');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    addComment
} = require('../controllers/taskController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router
    .route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router
    .route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

router.post('/:id/comments', protect, addComment);

module.exports = router;