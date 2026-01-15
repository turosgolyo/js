import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import apiClient from '../api/apiClient';
import type { User } from '../types/User';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState<User>({ username: '', password: '' });
    const navigate = useNavigate();
    return (
        <Container>
            <label>Email </label>
            <input type="email" onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <br />
            <label>Password </label>
            <input
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <br />
            <Button
                onClick={() => {
                    apiClient
                        .post('/login', user)
                        .then(() => {
                            toast.success('Login successful');
                            localStorage.setItem('credentials', JSON.stringify(user));
                            navigate('/');
                        })
                        .catch((err) => {
                            console.error(err);
                            toast.error('Login failed');
                        });
                }}
            >
                Login
            </Button>
        </Container>
    );
};

export default Login;
