import { useState } from 'react';
import { CssBaseline, Grid, Box, Paper, Avatar } from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import Login from "../auth/Login";
import Register from "../auth/Register";

const defaultTheme = createTheme();

const HomePage = () => {

    const [openForm, setOpenForm] = useState(true);

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {openForm ? "Sign in" : " Sign up"}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                {openForm ?
                                    <Login set={setOpenForm} />
                                    :
                                    <Register set={setOpenForm} />
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </ThemeProvider>

        </>
    );
}

export default HomePage;