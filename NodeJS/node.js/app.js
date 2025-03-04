//Régi

//const express = require('express');

//const app = express();

//app.listen(3001, () => {
//    console.log('Server runs on port 3001');
//});

//Új

import express, { json } from 'express';
import __dirname from './util/roothpath.js';

const app = express();
app.use(json());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/index", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/:parameter", (req, res) => {
    const param = req.params.parameter;
    console.log(param);
    res.send(param);
});

app.post("/", (req, res) => {
    // const name = req.body.name;
    // const age = req.body.age;

    const {name, age} = req.body;
    console.log(`Name: ${name} Age: ${age}`);
    res.send(req.body);
})

app.listen(3000, () => {
    console.log('Server runs on port 3000');
});