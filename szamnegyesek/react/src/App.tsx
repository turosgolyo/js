import { useState } from 'react';
import './App.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import type { Table } from './types/Table';
import apiClient from './api/apiClient';
import { toast } from 'react-toastify';

function App() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [number3, setNumber3] = useState(0);
    const [number4, setNumber4] = useState(0);
    const [tables, setTables] = useState<Array<Table>>([]);

    const submit = () => {
        const table: Table = {
            numbers: `[${number1}, ${number2}, ${number3}, ${number4}]`,
        };
        apiClient
            .post('/tables', table)
            .then(() => toast.success('A tábla létrehozva!'))
            .catch((err) => {
                console.error(err);
                toast.error('Valami nem jo');
            });
    };

    const getAll = () => {
        apiClient
            .get('/tables')
            .then((res) => setTables(res.data))
            .catch((err) => console.error(err));
    };

    const genCard = (t: Table) => {
        const numbers = JSON.parse(t.numbers);
        return (
            <Col>
                <Card style={{ margin: '10px' }}>
                    <Card.Body>
                        <Card.Title>{t.id}. tábla</Card.Title>
                        <Card.Text>
                            {numbers.map((e: number) => {
                                return `${e} `;
                            })}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );
    };
    return (
        <Container>
            <h1>Számnégyesek</h1>
            <Row>
                <Col>
                    <div>
                        Első szám:
                        <input
                            type="number"
                            className="input"
                            onChange={(e) => setNumber1(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        Második szám:
                        <input
                            type="number"
                            className="input"
                            onChange={(e) => setNumber2(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        Harmadik szám:
                        <input
                            type="number"
                            className="input"
                            onChange={(e) => setNumber3(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        Negyedik szám:
                        <input
                            type="number"
                            className="input"
                            onChange={(e) => setNumber4(Number(e.target.value))}
                        />
                    </div>
                    <Button className="button" onClick={submit}>
                        Küldés
                    </Button>
                    <Button className="button" onClick={getAll}>
                        Lekérés
                    </Button>
                </Col>
            </Row>
            <Row>{tables.map((t) => genCard(t))}</Row>
        </Container>
    );
}

export default App;
