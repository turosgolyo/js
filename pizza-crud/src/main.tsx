import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AllPizza from './pages/AllPizza';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-bootstrap';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllPizza />} />
                <Route path="/login" element={<Login />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer></ToastContainer>
    </StrictMode>,
);
