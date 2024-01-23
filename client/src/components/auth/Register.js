import React, { useState } from 'react';
import api from '../../utils/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const userData = { name, email, password };
            const response = await api.post('/auth/register', userData);

            console.log('User registered successfully:', response.data);
        } catch (error) {
            console.error('Registration failed:', error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;