import React, { useState } from 'react';
import api from '../../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            console.log('User logged in successfully:', response);
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;