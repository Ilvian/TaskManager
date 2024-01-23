// components/TaskCreate.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskCreate = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');

    const handleCreateTask = async () => {
        try {
            await axios.post('http://localhost:3001/api/tasks', {
                taskName,
                description,
                status,
                priority,
                dueDate,
            });

            console.log('Task created successfully');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <h2>Create Task</h2>
            <form>
                <label>
                    Task Name:
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <label>
                    Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <br />
                <label>
                    Priority:
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
                <br />
                <label>
                    Due Date:
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleCreateTask}>
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default TaskCreate;