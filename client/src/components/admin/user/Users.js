import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from "react";
import api from '../../../api/api';
import {
    Box, Container, Grid, Paper, Toolbar, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row } = props;

    console.log("row---", row);

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
                    {row.UserID}
                </TableCell>
                <TableCell align="right">{row.Name}</TableCell>
                <TableCell align="right">{row.Email}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="info" >Edit</Button>
                </TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="error" >Delete</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Use Tasks
                            </Typography>
                            <Table size="small" aria-label="purchases">
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
                                    {row.tasks.map((task, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">{task.TaskID}</TableCell>
                                            <TableCell>{task.TaskName}</TableCell>
                                            <TableCell>{task.Description}</TableCell>
                                            <TableCell >{task.Status}</TableCell>
                                            <TableCell>{task.Priority}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="info" >Edit</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="error" >Delete</Button>
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

    return (
        <>
            {
                data &&
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
                        <Toolbar />
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
                                                        <TableCell align="right">Edit</TableCell>
                                                        <TableCell align="right">Delete</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data.map((el) => {
                                                        return <Row key={el.Name} row={el} />
                                                    }
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            }
        </>
    );
};
export default Users;  