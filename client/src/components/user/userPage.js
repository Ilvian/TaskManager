import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, TextField } from "@mui/material";
import api from '../../api/api';
import "./index.css"

const tableStyles = {
    width: "5%"
}

const UserPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    async function getAllTasks() {
        try {
            const result = await api.get("/tasks/get");
            setTasks(result.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    const handleEdit = (task) => {
        console.log("Editing Task:", task);
        setSelectedTask(task);
        setEditModalOpen(true);
    };

    const handleDelete = (task) => {
        console.log("Deleting Task:", task);
        setSelectedTask(task);
        setDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleEditSave = async () => {
        try {
            if (!selectedTask || !selectedTask.TaskID) {
                console.error("Selected task or task ID is undefined.");
                return;
            }

            if (!selectedTask.Taskname) {
                console.error("Task name cannot be null or undefined.");
                return;
            }

            const updatedTask = {
                taskname: selectedTask.Taskname,
                status: selectedTask.Status,
                priority: selectedTask.Priority,
                description: selectedTask.Description,
            };

            console.log("Updating Task:", updatedTask);

            const response = await api.put(`/tasks/update/${selectedTask.TaskID}`, updatedTask);

            console.log("Update Response:", response);

            if (response.status === 200) {
                console.log("Task updated successfully:", response.data.task);
                setEditModalOpen(false);
                getAllTasks();
            } else {
                console.error("Error updating task:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating task:", error);
            console.log("Full error details:", error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            console.log("Selected Task:", selectedTask);
            if (!selectedTask || !selectedTask.TaskID) {
                console.error("Selected task or task ID is undefined.");
                return;
            }

            const response = await api.delete(`/tasks/delete/${selectedTask.TaskID}`);

            if (response.status === 200) {
                console.log("Task deleted successfully:", response.data.deletedTask);
                setDeleteModalOpen(false);
                getAllTasks();
            } else {
                console.error("Error deleting task:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <>
            <div className="table-container">
                <TableContainer component={Paper}>
                    <Table sx={{ tableLayout: "auto" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "5%" }}>Task name</TableCell>
                                <TableCell sx={{ width: "5%" }}>Status</TableCell>
                                <TableCell sx={{ width: "5%" }}>Priority</TableCell>
                                <TableCell sx={{ width: "5%" }}>Description</TableCell>
                                <TableCell sx={{ width: "5%" }}>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow
                                    key={task.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ width: "5%" }}>{task.Taskname}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Status}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Priority}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Description}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>
                                        <Button variant="contained" onClick={() => handleEdit(task)}>Edit</Button>
                                    </TableCell>
                                    <TableCell sx={{ width: "5%" }}>
                                        <Button variant="contained" onClick={() => handleDelete(task)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Modal open={editModalOpen} onClose={handleCloseEditModal}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Edit Task
                    </Typography>
                    <TextField label="Task Name" value={selectedTask?.Taskname} onChange={(e) => setSelectedTask({ ...selectedTask, Taskname: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                    <TextField label="Status" value={selectedTask?.Status} onChange={(e) => setSelectedTask({ ...selectedTask, Status: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                    <TextField label="Priority" value={selectedTask?.Priority} onChange={(e) => setSelectedTask({ ...selectedTask, Priority: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                    <TextField label="Description" value={selectedTask?.Description} onChange={(e) => setSelectedTask({ ...selectedTask, Description: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                    <Button variant="contained" onClick={handleEditSave}>Save</Button>
                </Box>
            </Modal>

            <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Confirm Deletion
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>Are you sure you want to delete the task "{selectedTask?.Taskname}"?</Typography>
                    <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
                </Box>
            </Modal>
        </>
    );
};

export default UserPage;