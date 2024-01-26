import React, { useState, useEffect } from 'react';
import { Button, TextField, Link, Grid, Alert, Stack } from '@mui/material/';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState({ status: false, message: "" });

  useEffect(() => {
    console.log("errorLogin----", errorLogin);
  }, []);


  const navigate = useNavigate();

  const openForm = () => {
    props.set(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        console.log('User logged in successfully:', response);
        const userId = response.data.user.UserID
        localStorage.setItem('userId', JSON.stringify(userId));
        navigate('/userpage');
      }
    } catch (error) {
      setErrorLogin({ status: true, message: error.response.data.message })
      console.log('error:', error);
    }
  };

  console.log("errorLogin-----", errorLogin.status);

  return (
    <>

      {errorLogin.status &&
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{errorLogin.message}</Alert>
        </Stack>
      }
      <form onSubmit={handleSubmit}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </form>
    </>
  );
};

export default Login;