import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the API
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.TaskID}>
                        {task.Taskname} - {task.Description} - {task.Status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
