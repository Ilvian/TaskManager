const db = require('../config/db');
const jwt = require('jsonwebtoken');

const auth = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const [existingUser] = await db.promise().query('SELECT * FROM User WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const [newUser] = await db.promise().query('INSERT INTO User (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

            res.status(201).json({ message: 'User registration successful', user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await db.promise().query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password]);

            if (!user[0].length) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ userId: user[0][0].UserID }, 'secret-key', {
                expiresIn: '1h',
            });

            //console.log("----auth-----", user[0][0]);
            req.admin = user[0][0];

            res.cookie("token", token, { httpOnly: true })
            res.status(200).json(
                {
                    message: 'User login successful',
                    user: user[0][0],
                });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },

    logout: async (req, res) => {
        res.clearCookie("token");
        res.status(200).json({ message: 'Succesfully logget out' });
    },

    authenticated: async (req, res) => {
        res.status(200).json({ user: req.userId });
    }
};

module.exports = auth;