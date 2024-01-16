const db = require('../config/db');

const createUserTable = `
CREATE TABLE IF NOT EXISTS User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(256) NOT NULL,
    Email VARCHAR(256) UNIQUE NOT NULL,
    Password VARCHAR(256) NOT NULL,
    isAdmin BOOLEAN DEFAULT 0,
    Avatar VARCHAR(256)
  );
  `;

db.query(createUserTable, (err, results) => {
    if (err) {
        console.error('Error creating table User:', err);
    } else {
        console.log('Table User has been created');
    }
})

module.exports = {};