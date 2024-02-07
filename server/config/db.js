const mysql = require('mysql2');
require("dotenv").config();
require("dotenv").config({ path: "./.env" });

console.log('ssss',process.env.DB_USER)
const connection = mysql.createPool({
    connectionLimit: 5,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    host: process.env.HOST || 'localhost',
});

connection.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    }
    console.log('Connected to MySQL');
});

module.exports = connection;