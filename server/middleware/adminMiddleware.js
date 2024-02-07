const db = require('../config/db');

const isAdmin = (req, res, next) => {
    console.log('is-Admin--------- :', req.user.userID);
    //const isAdmin = req.user && req.user.length > 0 && req.user[0].isAdmin === 1;
    const isAdmin = db.query('SELECT isAdmin FROM User where userId = ?', req.user.userID);

    if (isAdmin) {

        console.log('User has admin privileges. Allowing access.');
        next();
    } else {
        console.log('User does not have admin privileges. Blocking access.');
        res.status(403).json({ message: 'Access forbidden. Admin privileges required.' });
    }
};
module.exports = isAdmin;
