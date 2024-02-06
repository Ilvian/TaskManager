import { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import api from '../../api/api';
import "./index.css";

const CreateTaskModal = (props) => {
    const [newTask, setNewTask] = useState({
        Taskname: "",
        Status: "",
        Priority: "",
        Description: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleCreateSave = () => {
        handleCreateTask.mutate(newTask);
        props.close(false)
    }

    const handleCreateTask = useMutation({
        mutationFn: async (newTaskData) => {
            try {
                const id = localStorage.getItem("userId");
                const result = await api.post('/tasks/create', { newTaskData, id });
                console.log("result------", result)
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
                return result.data;
            } catch (error) {
                console.error('Error creating task:', error);
                throw error;
            }
        }
    })

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setNewTask((prev) => {
            return { ...prev, [name]: value }
        })
    }


    return (
        <>
            <Modal open={props.open} onClose={() => props.close(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Create Task
                    </Typography>
                    <TextField label="Task Name" value={newTask.Taskname} name="Taskname" onChange={handleChange} className="input-field" />
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        className="select-options"
                        onChange={handleChange}
                        name="Status"
                    >
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"In Progress"}>In Progress</MenuItem>
                        <MenuItem value={"Completed"}>Completed</MenuItem>
                    </Select>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Priority"
                        className="select-options"
                        onChange={handleChange}
                        name="Priority"
                    >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                    <TextField label="Description" value={newTask.Description} name="Description" onChange={handleChange} className="input-field" />
                    <Button variant="contained" onClick={handleCreateSave}>Save</Button>
                </Box>
            </Modal>
            {showSuccess && (
                <div className="success-tab">
                    Task created successfully!
                </div>
            )}
        </>
    )
}

export default CreateTaskModal;