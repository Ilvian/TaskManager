// utils/jwtUtils.js

const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        userID: user.UserID,
        email: user.Email,
        isAdmin: user.isAdmin,
    };

    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, 'SK test', options);
}

function verifyToken(token, callback) {
    jwt.verify(token, 'SK test', (err, decoded) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, decoded);
    });
}

module.exports = {
    generateToken,
    verifyToken,
};
