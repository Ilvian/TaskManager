import {
    Modal,
    Box,
    Typography,
    Button
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import api from '../../api/api';

const DeleteModal = (props) => {

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
                    <Typography sx={{ marginBottom: 2 }}>Are you sure you want to delete this task?</Typography>
                    <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Delete</Button>
                </Box>
            </Modal>
        </>
    )
}
export default DeleteModal;