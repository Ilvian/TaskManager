import { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    InputLabel,
    MenuItem,
    Select,
    Alert
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from '../../api/api';
import "./index.css"

const EditTaskModal = (props) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleUpdate = () => {
        console.log("-----", props.task);
        handleUpdateTask.mutate(props.task);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
        props.close(false);
    }


    const handleUpdateTask = useMutation({
        mutationFn: async () => {
            try {
                const result = await api.put(`tasks/update/${props.task.TaskID}`, props.task);
                return result;
            } catch (error) {
                console.error("Error updating task:", error);
                throw error;
            }
        }
    })

    const handleCloseAlert = () => {
        setShowSuccess(false);
    };


    return (
        <>
            <Modal open={props.open} onClose={() => props.close(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Create Task
                    </Typography>
                    <TextField value={props.task.Taskname} name="Taskname" onChange={props.setTask} className="input-field" />
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        className="select-options"
                        onChange={props.setTask}
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
                        onChange={props.setTask}
                        name="Priority"
                    >
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                    <TextField value={props.task.Description} name="Description" onChange={props.setTask} className="input-field" />
                    <Button variant="contained" onClick={handleUpdate}>Update</Button>
                </Box>
            </Modal>
            {showSuccess && (
                <div className="success-tab">
                    <Alert severity="success" onClose={handleCloseAlert}>
                        Task updated successfully!
                    </Alert>
                </div>
            )}

        </>
    )
}

export default EditTaskModal;