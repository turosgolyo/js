import express from 'express';
import cors from 'cors';
import * as students from './data/diakok.js';
import * as classes from './data/orak.js';

const app = express();
const PORT = 3321;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

app.get('/telepules', (req, res) => {
    const city = req.query.nev;
    const result = students.getCity(city);
    if (!result) {
        return res.json({ message: 'City not found!' });
    }
    return res.json(result);
});

app.get('/tanora', (req, res) => {
    const result = classes.getEnglishClasses();
    return res.json(result);
});

app.get('/9-matematika-fizika', (req, res) => {
    const result = classes.getNinthGradeClasses();
    return res.json(result);
});

app.get('/telepulesfo', (req, res) => {
    const result = students.getCityStudentCount();
    return res.json(result);
});

app.get('/tantargyak', (req, res) => {
    const result = classes.getUniqueClasses();
    return res.json(result);
});

app.get('/tanar', (req, res) => {
    const name = req.query.nev;
    const date = req.query.datum;
    const result = classes.getStudentsByTeacher(name, date);
    return res.json(result);
});

app.get('/telepulesrol', (req, res) => {
    const name = req.query.nev;
    const result = students.getStudentsFromCity(name);
    return res.json(result);
});
