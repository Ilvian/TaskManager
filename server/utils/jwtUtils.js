const jwt = require('jsonwebtoken');

function generateToken(req, res, next) {

}

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    jwt.verify(token, 'SK test', (err, decoded) => {
        if (err) {
            return next(err);
        }

        req.user = decoded;
        next();
    });
}



module.exports = { verifyToken, generateToken };