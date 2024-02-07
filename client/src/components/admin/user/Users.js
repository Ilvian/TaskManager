import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Box,
    Container,
    Grid,
    Paper,
    Toolbar,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Collapse,
    Button,
    Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditTaskModal from "../../modals/EditTaskModal";
import DeleteTaskModal from "../../modals/DeleteTaskModal";
import DeleteUserModal from "../../modals/DeleteUserModal";
import api from "../../../api/api";

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [task, setTask] = useState({ Taskname: "", Status: "", Priority: "", Description: "", TaskID: "" });
    const [userId, setUserId] = useState(null);

    const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);

    const handleEditTasks = (task) => {
        setTask(task);
        setOpenEditModal(true);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setTask((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleDeleteUser = (id) => {
        setUserId(id);
        setDeleteModal(true);
    }

    const handleDeleteTask = (taskId) => {
        setTaskIdToDelete(taskId);
        setOpenDeleteTaskModal(true);
        console.log("openDeleteTaskModal:", openDeleteTaskModal);
    }


    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.UserID}
                </TableCell>
                <TableCell align="right">{row.Name}</TableCell>
                <TableCell align="right">{row.Email}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="error" onClick={() => { handleDeleteUser(row.UserID) }}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                User Tasks
                            </Typography>
                            <Table size="small" aria-label="tasks">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Taskname</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        row.tasks.length > 0
                                            ?
                                            row.tasks.map((task, i) => {

                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell component="th" scope="row">{task.TaskID}</TableCell>
                                                        <TableCell>{task.Taskname}</TableCell>
                                                        <TableCell>{task.Description}</TableCell>
                                                        <TableCell >{task.Status}</TableCell>
                                                        <TableCell>{task.Priority}</TableCell>
                                                        <TableCell>
                                                            <Button variant="contained" color="info" onClick={() => { handleEditTasks(task) }}>
                                                                Edit
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="contained" color="error" onClick={() => handleDeleteTask(task.TaskID)}>
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            <TableRow>
                                                <TableCell colSpan={3} />
                                                <TableCell>
                                                    <Alert severity="info">This user has not created any tasks.</Alert>
                                                </TableCell>
                                                <TableCell colSpan={3} />

                                            </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <EditTaskModal open={openEditModal} close={setOpenEditModal} task={task} setTask={handleChange} />
            <DeleteUserModal open={openDeleteModal} close={setDeleteModal} id={userId} />
            <DeleteTaskModal open={openDeleteTaskModal} close={() => setOpenDeleteTaskModal(false)} id={taskIdToDelete} />



        </>
    );
}

const Users = () => {
    const { data } = useQuery({
        queryKey: ['userWithTasks'],
        queryFn: async () => {
            try {
                const result = await api.get('/admin/usersWithTasks');
                return result.data.users;
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    });

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await api.post("auth/logout");
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            {data && (
                <Box sx={{ display: 'flex' }}>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {/* Users with Tasks */}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Toolbar>
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom component="div">
                                            Users with Tasks
                                        </Typography>
                                        <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell />
                                                        <TableCell>User Id</TableCell>
                                                        <TableCell align="right">Username</TableCell>
                                                        <TableCell align="right">Email</TableCell>
                                                        <TableCell align="right">Delete</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.map((el, index) => {
                                                        return (
                                                            <Row
                                                                key={index}
                                                                row={el}
                                                            />
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Users;