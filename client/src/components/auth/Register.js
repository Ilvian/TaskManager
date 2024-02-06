import React, { useState } from 'react';
import { Button, TextField, Link, Box, Grid, Snackbar } from '@mui/material/';
import MuiAlert from '@mui/material/Alert';
import api from '../../api/api';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const openForm = () => {
        props.set(true);
    };

    const handleCloseSnackbar = () => {
        setRegistrationSuccess(false);
    };

    const handleRegistrationSuccess = () => {
        setRegistrationSuccess(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { name, email, password };
            const response = await api.post('/auth/register', userData);
            console.log('User registered successfully:', response.data);
            handleRegistrationSuccess();
        } catch (error) {
            console.error('Registration failed:', error.response.data.error);
        }
    };

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Snackbar
                    open={registrationSuccess}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleCloseSnackbar}
                        severity="success"
                    >
                        Registration successful! You can now sign in.
                    </MuiAlert>
                </Snackbar>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" onClick={openForm} variant="body2">
                            Are you registered? Sign In
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Register;