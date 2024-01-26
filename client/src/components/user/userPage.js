import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, TextField } from "@mui/material";
import api from '../../api/api';
import "./index.css"
import { useMutation, useQuery } from "@tanstack/react-query";

const tableStyles = {
    width: "5%"
}

const UserPage = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        Taskname: "",
        Status: "",
        Priority: "",
        Description: "",
        UserID: 0
    });
    const [createModalOpen, setCreateModalOpen] = useState(false);



    const { data } = useQuery({
        queryKey: ['userTasks'],
        queryFn: async () => {
            const id = localStorage.getItem('userId')
            try {
                const result = await api.get(`tasks/get/user/${id}`);
                console.log("result---", result);

                return result.data.tasks;
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    })
    //////////////////////////////////////////////////////////

    const handleCreate = () => {
        setNewTask({
            Taskname: "",
            Status: "",
            Priority: "",
            Description: "",
            UserID: 0
        });
        setEditModalOpen(true);
    };

    const handleCreateSave = () => {
        handleCreateTask.mutate(newTask);
        setEditModalOpen(false);
    };

    const handleCreateTask = useMutation({
        mutationFn: async (newTaskData) => {
            try {
                const result = await api.post('tasks/create', newTaskData);
                return result;
            } catch (error) {
                console.error('Error creating task:', error);
                throw error;
            }
        }
    })

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
    }
    //////////////////////////////////////////////////////////
    const handleEdit = (taskId) => {
        setEditModalOpen(true);
        const myTask = data.find((el => {
            return el.TaskID === taskId;
        }));
        setSelectedTask(myTask);
    }

    const handleEditSave = useMutation({
        mutationFn: async (selectedTask) => {
            try {
                const result = await api.put(`tasks/update/${selectedTask.TaskID}`, selectedTask);
                return result;
            } catch (error) {
                console.error("Error updating task:", error);
                throw error;
            }
        }
    })

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    }
    //////////////////////////////////////////////////////////
    const handleDelete = (taskId) => {
        setDeleteModalOpen(true)
        setSelectedTask(taskId)
    }

    const handleDeleteTask = useMutation({
        mutationFn: async (taskId) => {
            try {
                const result = await api.delete(`tasks/delete/${taskId}`);
                return result;
            } catch (error) {
                console.error('Error deleting task:', error);
                throw error;
            }
        }
    });

    const handleDeleteConfirm = () => {
        const taskIdToDelete = selectedTask.TaskID;
        handleDeleteTask.mutate(taskIdToDelete);
        setDeleteModalOpen(false);
    }

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    }
    //////////////////////////////////////////////////////////

    if (data) {
        return (
            <>
                <div className="table-container">
                    <Button variant="contained" onClick={handleCreate}>Create</Button>
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
                                {data.map((task, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ width: "5%" }}>{task.Taskname}</TableCell>
                                        <TableCell sx={{ width: "5%" }}>{task.Status}</TableCell>
                                        <TableCell sx={{ width: "5%" }}>{task.Priority}</TableCell>
                                        <TableCell sx={{ width: "5%" }}>{task.Description}</TableCell>
                                        <TableCell sx={{ width: "5%" }}>
                                            <Button variant="contained" onClick={() => { handleEdit(task.TaskID) }}>Edit</Button>
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
                        <Button variant="contained" onClick={() => handleEditSave.mutate(selectedTask)}>Save</Button>
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

                <Modal open={createModalOpen} onClose={handleCloseCreateModal}>
                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                            Create Task
                        </Typography>
                        <TextField label="Task Name" value={newTask.Taskname} onChange={(e) => setNewTask({ ...newTask, Taskname: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                        <TextField label="Status" value={newTask.Status} onChange={(e) => setNewTask({ ...newTask, Status: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                        <TextField label="Priority" value={newTask.Priority} onChange={(e) => setNewTask({ ...newTask, Priority: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                        <TextField label="Description" value={newTask.Description} onChange={(e) => setNewTask({ ...newTask, Description: e.target.value })} fullWidth sx={{ marginBottom: 2 }} />
                        <Button variant="contained" onClick={handleCreateSave}>Save</Button>
                    </Box>
                </Modal>

            </>
        );
    }

};

export default UserPage;