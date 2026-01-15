import { useEffect, useState } from 'react';
import type { Pizza } from '../types/Pizza';
import apiClient, { BACKEND_URL } from '../api/apiClient';
import { Card, CardBody, CardImg, Col, Container, Row } from 'react-bootstrap';

const AllPizza = () => {
    const [pizzak, setPizzak] = useState<Array<Pizza>>([]);

    useEffect(() => {
        apiClient
            .get('/pizzak')
            .then((res) => setPizzak(res.data))
            .catch((err) => console.error(err));
    }, []);

    const generateCard = (p: Pizza) => {
        return (
            <Col>
                <Card style={{ width: '18rem' }}>
                    <CardImg src={`${BACKEND_URL}/kepek/${p.imageUrl}`}></CardImg>
                    <CardBody>
                        <h3>{p.nev}</h3>
                        <p>{p.leiras}</p>
                        <p>{p.ar} Ft</p>
                    </CardBody>
                </Card>
            </Col>
        );
    };

    return (
        <Container>
            <Row>{pizzak.map((p) => generateCard(p))}</Row>
        </Container>
    );
};
export default AllPizza;
