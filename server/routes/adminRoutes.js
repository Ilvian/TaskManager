const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const isAdmin = require('../middleware/adminMiddleware');
const verifyToken = require('../middleware/authMiddleware')

router.use(verifyToken);
router.use(isAdmin);

router.get('/users', admin.getAllUsers);
router.get('/users/:userId', admin.getUserDetailsById);
router.put('/users/:userId/edit', admin.editUserDetails);
router.delete('/users/:userId/delete', admin.deleteUser);
router.get('/tasks', admin.getAllTasks);
router.get('/tasks/:taskId', admin.getTaskDetails)
router.put('/tasks/:taskId/edit', admin.editTaskDetails)
router.delete('/tasks/:taskId/delete', admin.deleteTask);

module.exports = router;
