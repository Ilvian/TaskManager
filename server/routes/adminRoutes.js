const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');

router.get('/users', admin.getAllUsers);
router.get('/users/:userId', admin.getUserDetails);
router.put('/users/:userId/edit', admin.editUserDetails);
router.delete('/users/:userId/delete', admin.deleteUser);
router.get('/tasks', admin.getAllTasks);
router.get('/tasks/:taskId', admin.getTaskDetails)
router.put('/tasks/:taskId/edit', admin.editTaskDetails)
router.delete('/tasks/:taskId/delete', admin.deleteTask);

module.exports = router;
