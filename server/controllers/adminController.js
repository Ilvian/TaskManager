const User = require('../models/User');
const Task = require('../models/Task');
const db = require('../config/db');

const AdminController = {
    getAllUsers: async (req, res) => {
        try {
            const [users] = await db.promise().query('SELECT * FROM User');
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },

    getAllTasks: async (req, res) => {
        try {
            const [tasks] = await db.promise().query('SELECT * FROM Task');
            res.status(200).json({ tasks });
        } catch (error) {
            console.error('Error getting tasks:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },
};

module.exports = AdminController;
