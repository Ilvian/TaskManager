const express = require('express');
const router = express.Router();
const task = require('../controllers/taskController');

router.get('/get', task.getAllTasks);
router.post('/create', task.createTask);
router.get('/get/:taskId', task.getTaskById);
router.put('/update/:taskId', task.updateTask);
router.delete('/delete/:taskId', task.deleteTask);

module.exports = router;