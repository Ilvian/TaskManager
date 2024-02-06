import { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import api from '../../api/api';

const DeleteTaskModal = (props) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleDeleteTask = useMutation({
        mutationFn: async (taskId) => {
            try {
                const result = await api.delete(`tasks/delete/${taskId}`);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
                return result;
            } catch (error) {
                console.error('Error deleting task:', error);
                console.log("Server response:", error.response);
                throw error;
            }
        }
    });

    const handleDeleteConfirm = () => {
        handleDeleteTask.mutate(props.id);
        props.close(false);
    }

    return (
        <>
            <Modal open={props.open} onClose={() => props.close(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Confirm Deletion
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>Are you sure you want to delete this user and the Tasks related?</Typography>
                    <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Yes</Button>
                    <Button style={{ float: 'right' }} variant="contained" color="info" onClick={() => props.close(false)}>No</Button>
            </Box>
        </Modal >
        {showSuccess && (
                <div className="success-tab">
                    <Typography>User deleted successfully!</Typography>
                </div>
            )}
        </>
    )
}
export default DeleteTaskModal;