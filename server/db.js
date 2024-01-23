const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Ilvian',
    password: '0106',
    database: 'TaskManager',
});

module.exports = db;
