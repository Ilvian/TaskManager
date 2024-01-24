import React, { useState } from 'react';
import { Button, TextField, Link, Box, Grid } from '@mui/material/';
import api from '../../utils/api';
const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const openForm = () => {
        props.set(true)
    }

    const handleSubmit = async () => {
        try {
            const userData = { name, email, password };
            const response = await api.post('/auth/register', userData);

            console.log('User registered successfully:', response.data);
        } catch (error) {
            console.error('Registration failed:', error.response.data.error);
        }
    };

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
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
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
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