import express, { json } from 'express';
import __dirname from './util/roothpath.js';
const app = express();
app.use(json());

const flowers = [
    {"name" : "nárcisz", "category" : "egyéves"},
    {"name" : "rózsa", "category" : "egyéves"},
    {"name" : "tulipán", "category" : "egyéves"}
]

const trees = [
    {"name" : "tölgy", "category" : "lombhullató"},
    {"name" : "fűz", "category" : "lombhullató"},
    {"name" : "fenyő", "category" : "örökzöld"}
]


app.get('/flowers', (req, res) => {
    res.send(flowers)
    res.sendFile("./views/flowers.html", { root: __dirname });
})
app.get('/trees', (req, res) => {
    res.send(trees)
    res.sendFile("./views/trees.html", { root: __dirname });
})
app.use((req, res, next) => {
    res.status(404).sendFile("./views/404.html", { root: __dirname });
});


app.listen(3010, () => {
    console.log("Server runs on port 3010.")
})