import axios from 'axios';
import type { User } from '../types/User';

export const BACKEND_URL = 'http://localhost:8001/api';

const auth: User = JSON.parse(localStorage.getItem('credentials') || '{}');

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    auth,
});

export default apiClient;
