const db = require('../config/db');

const createTaskTable = `
CREATE TABLE IF NOT EXISTS Task (
    TaskID INT PRIMARY KEY AUTO_INCREMENT,
    Taskname VARCHAR(256) NOT NULL,
    Description TEXT,
    Status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    Priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
    DueDate DATE,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
  );
  `;

db.query(createTaskTable, (err, results) => {
    if (err) {
        console.error('Error creating table Task:', err);
    } else {
        console.log('Table Task has been created');
    }
})

module.exports = { createTaskTable };