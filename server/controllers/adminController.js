const db = require('../config/db');

const admin = {
    getAllUsers: async (req, res) => {
        try {
            const [users] = await db.promise().query('SELECT * FROM User');
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ message: ' Error' });
        }
    },

    getAllTasks: async (req, res) => {
        try {
            const [tasks] = await db.promise().query('SELECT * FROM Task');
            res.status(200).json({ tasks });
        } catch (error) {
            console.error('Error getting tasks:', error);
            res.status(500).json({ message: ' Error' });
        }
    },

    getUserDetailsById: async (req, res) => {
        const userId = req.params.userId;

        try {
            const [user] = await db.promise().query('SELECT * FROM User WHERE UserID = ?', [userId]);

            if (user.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ user: user[0] });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user details from the database', details: error.message });
        }
    },

    getTaskDetails: async (req, res) => {
        const taskId = req.params.taskId;

        try {
            const [task] = await db.promise().query('SELECT * FROM Task WHERE TaskID = ?', [taskId]);

            if (task.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.status(200).json({ task: task[0] });
        } catch (error) {
            console.error('Error getting task details:', error);
            res.status(500).json({ error: ' Error' });
        }
    },

    editUserDetails: async (req, res) => {
        const userId = req.params.userId;
        const { newName, newEmail } = req.body;

        try {
            const [updatedUser] = await db.promise().query('UPDATE User SET Name = ?, Email = ? WHERE UserID = ?', [newName, newEmail, userId]);

            if (updatedUser.affectedRows === 0) {
                console.log('User not found');
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User details edited successfully', user: updatedUser });
        } catch (error) {
            res.status(500).json({ error: 'Error editing user details in the database', details: error.message });
        }
    },

    editTaskDetails: async (req, res) => {
        const taskId = req.params.taskId;
        const { newTaskName, newDescription, newStatus, newPriority, newDueDate } = req.body;

        try {

            const [updatedTask] = await db.promise().query('UPDATE Task SET taskname = ?, description = ?, status = ?, priority = ?, dueDate = ? WHERE TaskID = ?',
                [newTaskName, newDescription, newStatus, newPriority, newDueDate, taskId]);

            if (updatedTask.affectedRows === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.status(200).json({ message: 'Task details edited successfully', task: updatedTask });
        } catch (error) {
            console.error('Error editing task details:', error);
            res.status(500).json({ error: 'Error editing task details in the database', details: error.message });
        }
    },

    deleteUser: async (req, res) => {
        console.log("userId-----")
        const userId = req.params.userId;

        try {
            const [deletedUser] = await db.promise().query('DELETE FROM User WHERE UserID = ?', [userId]);

            if (deletedUser.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Error deleting user in the database', details: error.message });
        }
    },

    deleteTask: async (req, res) => {
        const taskId = req.params.taskId;

        try {
            const [deletedTask] = await db.promise().query('DELETE FROM Task WHERE TaskID = ?', [taskId]);

            if (deletedTask.affectedRows === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: 'Error deleting task in the database', details: error.message });
        }
    },

    getAllUsersWithTasks: async (req, res) => {
        try {
            const query = `
                SELECT User.UserID, User.Name AS UserName, User.Email, Task.TaskID, Task.Taskname, Task.Description, Task.Status, Task.Priority, Task.DueDate
                FROM User
                LEFT JOIN Task ON User.UserID = Task.UserID
            `;

            const [usersWithTasks] = await db.promise().query(query);

            const usersData = usersWithTasks.reduce((result, row) => {
                const userId = row.UserID;

                if (!result[userId]) {
                    result[userId] = {
                        UserID: userId,
                        Name: row.UserName,
                        Email: row.Email,
                        tasks: []
                    };
                }

                if (row.TaskID) {
                    result[userId].tasks.push({
                        TaskID: row.TaskID,
                        Taskname: row.Taskname,
                        Description: row.Description,
                        Status: row.Status,
                        Priority: row.Priority,
                        DueDate: row.DueDate
                    });
                }

                return result;
            }, {});

            const users = Object.values(usersData);

            res.status(200).json({ users });
        } catch (error) {
            console.error('Error getting users with tasks:', error);
            res.status(500).json({ message: 'Error' });
        }
    },

    getUserTasks: async (req, res) => {
        const { userId } = req.params;

        try {
            const [userTasks] = await db.promise().query('SELECT * FROM Task WHERE UserID = ?', [userId]);

            res.status(200).json({ tasks: userTasks });
        } catch (error) {
            console.error('Error getting user tasks:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

};

module.exports = admin;