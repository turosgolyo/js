import express from 'express';
import __dirname from './util/roothpath.js'
const app = express();

app.get('/index', (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
})
app.listen(3001, () => {
    console.log('Server running on port 3001');
});