const express = require('express');
const router = express.Router();
const task = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware')

router.get('/get', task.getAllTasks);
router.post('/create', verifyToken, task.createTask);
router.get('/get/:taskId', verifyToken, task.getTaskById);
router.put('/update/:taskId', verifyToken, task.updateTask);
router.delete('/delete/:taskId', verifyToken, task.deleteTask);
router.get('/get/user/:userId', verifyToken, task.getTasksByUserId)

module.exports = router;