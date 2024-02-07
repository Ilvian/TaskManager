import axios from 'axios';

const API_BASE_URL = process.env.API_HOST || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default api;