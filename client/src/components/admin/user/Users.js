import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    Container,
    Grid,
    Paper,
    Toolbar,
    IconButton,
    Collapse
} from "@mui/material";
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from '../../../api/api';
import "./index.css"
import AdminPage from "../AdminPage";
import { useMutation, useQuery } from "@tanstack/react-query";

// const tableStyles = {
//     width: "5%"
// }


const createData = (name, calories, fat, carbs, protein, price) => {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

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
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

const CollapsibleTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Password</TableCell>
                        <TableCell align="right">
                            Update
                        </TableCell>
                        <TableCell align="right">
                            Delete
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const Users = () => {
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
    const [createModalOpen, setCreateModalOpen] = useState(false)

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

    const handleCreate = () => {
        setNewTask({
            Taskname: "",
            Status: "",
            Priority: "",
            Description: "",
            //UserID: 0
        });
        setCreateModalOpen(true);
    };

    const handleCreateSave = () => {
        handleCreateTask.mutate(newTask);
        setCreateModalOpen(false);
    };

    const handleCreateTask = useMutation({
        mutationFn: async (newTaskData) => {
            try {
                const result = await api.post('tasks/create', newTaskData);
                return result.data;
            } catch (error) {
                console.error('Error creating task:', error);
                throw error;
            }
        }
    })

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
    }

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


    return (
        <>

            <Box sx={{ display: 'flex' }}>
                <AdminPage />
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
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CollapsibleTable />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>

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
    )
};

export default Users;