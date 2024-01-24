import React, { useState } from 'react';
import { Button, TextField, Link, Grid } from '@mui/material/';
import api from '../../utils/api';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const openForm = () => {
        props.set(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            console.log('User logged in successfully:', response);
            localStorage.setItem('token', response.data.user)
            return response;

        } catch (error) {
            if (error.response) {
                console.error('Login failed:', error.response.data.error);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during request setup:', error.message);
            }
        }

    };

    return (
        <>

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
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;