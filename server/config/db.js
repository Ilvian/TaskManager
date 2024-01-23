const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Ilvian',
    password: '0106',
    database: 'TaskManager'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    }
    console.log('Connected to MySQL');
});

module.exports = connection;