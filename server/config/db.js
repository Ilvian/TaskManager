const mysql = require('mysql2');
require("dotenv").config();


console.log('ssss',process.env.DB_USER)
const connection = mysql.createConnection({
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST || 'localhost',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    }
    console.log('Connected to MySQL');
});

module.exports = connection;