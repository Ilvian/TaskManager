const Task = require('../models/Task');
const db = require('../config/db');

const TaskController = {
    getAllTasks: async (req, res) => {
        try {
            const [tasks] = await db.promise().query('SELECT * FROM Task');
            res.status(200).json({ tasks });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },

    createTask: async (req, res) => {
        try {
            const { Taskname, Description, Status, Priority, DueDate } = req.body;
            const { UserID } = req.body;

            const [newTask] = await db.promise().query('INSERT INTO Task (Taskname, Description, Status, Priority, DueDate, UserID) VALUES (?, ?, ?, ?, ?, ?)', [Taskname, Description, Status, Priority, DueDate, UserID]);

            res.status(201).json({ message: 'Task created successfully', task: newTask });
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },

    getTaskById: async (req, res) => {
        const taskId = req.params.taskId;
        try {
            const [task] = await db.promise().query('SELECT * FROM Task WHERE TaskID = ?', [taskId]);
            if (task.length === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ task: task[0] });
        } catch (error) {
            console.error(`Error fetching task by ID ${taskId}:`, error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateTask: async (req, res) => {
        const taskId = req.params.taskId;
        try {
            const { Taskname, Description, Status, Priority, DueDate } = req.body;
            const [updatedTask] = await db.promise().query('UPDATE Task SET Taskname = ?, Description = ?, Status = ?, Priority = ?, DueDate = ? WHERE TaskID = ?',
                [Taskname, Description, Status, Priority, DueDate, taskId]);

            if (updatedTask.affectedRows === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
        } catch (error) {
            console.error(`Error updating task by ID ${taskId}:`, error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteTask: async (req, res) => {
        const taskId = req.params.taskId;
        try {
            const [deletedTask] = await db.promise().query('DELETE FROM Task WHERE TaskID = ?', [taskId]);
            if (deletedTask.affectedRows === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
        } catch (error) {
            console.error(`Error deleting task by ID ${taskId}:`, error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = TaskController;
