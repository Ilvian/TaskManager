import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import api from '../../api/api';

const DeleteUserModal = (props) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleDeleteConfirm = () => {
        handleDelete.mutate(props.id);
        props.close(false)
    }

    const handleDelete = useMutation({
        mutationFn: async () => {
            try {
                const result = await api.delete(`admin/users/${props.id}/delete`);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
                return result;
            } catch (error) {
                console.error("Error updating task:", error);
                throw error;
            }
        }
    })

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
                    User deleted successfully!
                </div>
            )}

        </>
    );
};

export default DeleteUserModal;
