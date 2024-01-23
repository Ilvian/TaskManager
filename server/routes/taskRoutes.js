const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwtUtils');
const db = require('../db');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.status(401).send('Access denied');

    jwtUtils.verifyToken(token, (err, user) => {
        if (err) return res.status(403).send('Invalid token');

        req.user = user;
        next();
    });
}

router.get('/tasks', verifyToken, (req, res) => {
    const userID = req.user.userID;

    const sql = 'SELECT * FROM Task WHERE UserID = ?';
    db.query(sql, [userID], (err, result) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).json({ error: 'Error fetching tasks' });
        }

        res.status(200).json(result);
    });
});

router.post('/create', verifyToken, (req, res) => {
    const { taskName, description, status, priority, dueDate } = req.body;
    const userID = req.user.userID;

    const sql = 'INSERT INTO Task (TaskName, Description, Status, Priority, DueDate, UserID) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [taskName, description, status, priority, dueDate, userID], (err, result) => {
        if (err) {
            console.error('Error creating task:', err);
            return res.status(500).json({ error: 'Error creating task' });
        }

        res.status(201).json({ message: 'Task created successfully' });
    });
});

router.put('/update/:taskID', verifyToken, (req, res) => {
    const taskID = req.params.taskID;
    const { taskName, description, status, priority, dueDate } = req.body;
    const userID = req.user.userID;

    const sql = 'UPDATE Task SET TaskName = ?, Description = ?, Status = ?, Priority = ?, DueDate = ? WHERE TaskID = ? AND UserID = ?';
    db.query(sql, [taskName, description, status, priority, dueDate, taskID, userID], (err, result) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).json({ error: 'Error updating task' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }

        res.status(200).json({ message: 'Task updated successfully' });
    });
});

router.delete('/delete/:taskID', verifyToken, (req, res) => {
    const taskID = req.params.taskID;
    const userID = req.user.userID;

    const sql = 'DELETE FROM Task WHERE TaskID = ? AND UserID = ?';
    db.query(sql, [taskID, userID], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            return res.status(500).json({ error: 'Error deleting task' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found or unauthorized' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;
