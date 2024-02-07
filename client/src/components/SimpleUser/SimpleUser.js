import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import CreateTaskModal from "../modals/CreateTaskModal";
import EditTaskModal from "../modals/EditTaskModal";
import DeleteTaskModal from "../modals/DeleteTaskModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTask } from '../modals/TaskContext';
import "./simpleUser.css";
import api from '../../api/api';

const SimpleUser = () => {
    const navigate = useNavigate();
    const { taskSuccess, setTaskSuccess } = useTask();
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [task, setTask] = useState({ Taskname: "", Status: "", Priority: "", Description: "", TaskID: "" });
    const [id, setTaskId] = useState();
    const { data } = useQuery({
        queryKey: ['userTasks'],
        queryFn: async () => {
            const id = localStorage.getItem('userId')
            try {
                const result = await api.get(`tasks/get/user/${id}`);
                return result.data.tasks;
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    });

    const handleEdit = (task) => {
        setTask(task);
        setOpenEdit(true);
    }

    const handleDelete = (id) => {
        setTaskId(id);
        setOpenDelete(true)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setTask((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleLogout = async () => {
        try {
            await api.post('auth/logout');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <>
            <div className="table-container">
                <Button variant="contained" onClick={() => { setOpenCreate(true); }} className="button-style">Create</Button>
                <Button variant="contained" onClick={handleLogout} className="button-style">Logout</Button>
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
                            {data && data.map((task, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ width: "5%" }}>{task.Taskname}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Status}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Priority}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Description}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>
                                        <Button variant="contained" onClick={() => {
                                            handleEdit(task)
                                        }}>Edit</Button>
                                    </TableCell>
                                    <TableCell sx={{ width: "5%" }}>
                                        <Button variant="contained" onClick={() => handleDelete(task.TaskID)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <CreateTaskModal open={openCreate} close={setOpenCreate} setTaskSuccess={setTaskSuccess} />
            <EditTaskModal setTask={handleChange} open={openEdit} task={task} close={setOpenEdit} setTaskSuccess={setTaskSuccess} />
            <DeleteTaskModal open={openDelete} id={id} close={setOpenDelete} setTaskSuccess={setTaskSuccess} />
            {taskSuccess && (
                <div className="success-message">
                    {/* Task operation successful! */}
                </div>
            )}
        </>
    )
}

export default SimpleUser;