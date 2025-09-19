import express from 'express';

const cars = [
    { id: 1, brand: 'BMW', model: 'X5' },
    { id: 2, brand: 'Audi', model: 'A6' },
    { id: 3, brand: 'Mercedes', model: 'C200' },
];

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/cars', (req, res) => {
    res.status(200).json(cars);
});

app.get('/cars/:id', (req, res) => {
    const id = +req.params.id;
    let car = cars.find((x) => x.id === id);
    if (!car) {
        return res.status(404).json({ message: 'Car not found!' });
    }
    res.status(200).json(car);
});

app.post('/cars', (req, res) => {
    const { brand, model } = req.body;
    if (!brand || !model) {
        return res.status(400).json({ message: 'Invalid credentials!' });
    }
    const id = cars.length ? cars[cars.length - 1].id + 1 : 1;
    const car = { id, brand, model };
    cars.push(car);
    res.status(200).json(car);
});

app.put('/cars/:id', (req, res) => {
    const id = +req.params.id;
    let car = cars.find((x) => x.id == id);
    if (!car) {
        return res.status(404).json({ message: 'Car not found!' });
    }
    const { brand, model } = req.body;
    if (!brand || !model) {
        return res.status(400).json({ message: 'Invalid credentials!' });
    }
    const index = cars.indexOf(car);
    car = { id: car.id, brand: brand, model: model };
    cars[index] = car;
    res.status(200).json(car);
});

app.delete('/cars/:id', (req, res) => {
    const id = +req.params.id;
    let car = cars.find((x) => x.id === id);
    if (!car) {
        return res.status(404).json({ message: 'Car not found!' });
    }
    let index = cars.indexOf(car);
    cars.splice(index, 1);
    res.status(200).json({ message: 'Delete successful!' });
});
