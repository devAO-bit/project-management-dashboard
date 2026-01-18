const express = require('express');
const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    addTeamMember,
    getProjectAnalytics
} = require('../controllers/projectController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(protect, getProjects)
    .post(protect, authorize('admin', 'manager'), createProject);

router
    .route('/:id')
    .get(protect, getProject)
    .put(protect, updateProject)
    .delete(protect, deleteProject);

router.post('/:id/team', protect, addTeamMember);
router.get('/:id/analytics', protect, getProjectAnalytics);

module.exports = router;
