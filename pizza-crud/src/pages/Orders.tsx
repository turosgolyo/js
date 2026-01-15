import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import type { Order } from '../types/Order';
import apiClient from '../api/apiClient';

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        apiClient
            .get('/rendelesek')
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return localStorage.getItem('credentials') ? (
        <Container>
            {orders.map((o) => {
                return (
                    <Row>
                        <Col>{o.pizzaId}</Col>
                        <Col>{o.mennyiseg}</Col>
                    </Row>
                );
            })}
        </Container>
    ) : (
        <></>
    );
};

export default Orders;
