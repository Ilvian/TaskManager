import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material/';
import api from '../../utils/api';
import "./index.css"

const tableStyles = {
    // alignContent: "center",
    width: "5%"
}

const Task = () => {
    const [tasks, setTasks] = useState([]);

    async function getAllTasks() {
        try {
            const result = await api.get("/tasks/get");
            setTasks(result.data.tasks)
        } catch (error) {
            console.log("error----", error);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, []);


    console.log("tasks-----", tasks)

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
                                <TableCell sx={{ width: "5%" }}>Desription</TableCell>
                                <TableCell sx={{ width: "5%" }}>Edit</TableCell>
                                <TableCell>Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ width: "5%" }}>{task.Taskname}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Status}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Priority}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>{task.Description}</TableCell>
                                    <TableCell sx={{ width: "5%" }}>
                                        <Button variant="contained">Edit</Button>
                                    </TableCell>
                                    <TableCell sx={{ width: "5%" }}>
                                        <Button variant="contained">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        </>
    );
}

export default Task;