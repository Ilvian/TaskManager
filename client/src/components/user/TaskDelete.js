import React from 'react';
import axios from 'axios';

const TaskDelete = ({ taskId, onClose }) => {
    const handleDeleteTask = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);

            console.log('Task deleted successfully');
            onClose();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Delete Task</h2>
            <p>Are you sure you want to delete this task?</p>
            <button type="button" onClick={handleDeleteTask}>
                Yes, Delete
            </button>
            <button type="button" onClick={onClose}>
                Cancel
            </button>
        </div>
    );
};

export default TaskDelete;