const User = require('../models/User');
const db = require('../config/db');

const UserController = {
    registerUser: async (req, res) => {
        try {
            const { Name, Email, Password } = req.body;

            const [existingUser] = await db.promise().query('SELECT * FROM User WHERE Email = ?', [Email]);

            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const [newUser] = await db.promise().query('INSERT INTO User (Name, Email, Password) VALUES (?, ?, ?)', [Name, Email, Password]);

            res.status(201).json({ message: 'User registration successful', user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { Email, Password } = req.body;
            const [user] = await db.promise().query('SELECT * FROM User WHERE Email = ? AND Password = ?', [Email, Password]);

            if (user.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.status(200).json({ message: 'User login successful', user: user[0] });

        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    }
};

module.exports = UserController;