import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskUpdate = ({ taskId, onClose }) => {
    const [task, setTask] = useState({});
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/tasks/${taskId}`);
                setTask(response.data);
                setTaskName(response.data.TaskName);
                setDescription(response.data.Description);
                setStatus(response.data.Status);
                setPriority(response.data.Priority);
                setDueDate(response.data.DueDate);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchTask();
    }, [taskId]);

    const handleUpdateTask = async () => {
        try {
            await axios.put(`http://localhost:3001/api/tasks/${taskId}`, {
                taskName,
                description,
                status,
                priority,
                dueDate,
            });

            console.log('Task updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div>
            <h2>Update Task</h2>
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
                <button type="button" onClick={handleUpdateTask}>
                    Update Task
                </button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default TaskUpdate;