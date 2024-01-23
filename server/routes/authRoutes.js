const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwtUtils');
const db = require('../db');

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const sql = 'INSERT INTO User (Name, Email, Password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('User registration failed:', err);
            return res.status(500).json({ error: 'User registration failed' });
        }

        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM User WHERE Email = ? AND Password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('User login failed:', err);
            return res.status(500).json({ error: 'User login failed' });
        }

        if (result.length === 1) {
            const user = result[0];
            const token = jwtUtils.generateToken(user);
            console.log('User logged in successfully');
            res.status(200).json({ message: 'User logged in successfully', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });

    router.get('/profile', verifyToken, (req, res) => {
        const userID = req.user.userID;

        const sql = 'SELECT UserID, Name, Email, isAdmin, Avatar FROM User WHERE UserID = ?';
        db.query(sql, [userID], (err, result) => {
            if (err) {
                console.error('Error fetching user profile:', err);
                return res.status(500).json({ error: 'Error fetching user profile' });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const userProfile = result[0];
            res.status(200).json(userProfile);
        });
    });

});

module.exports = router;
