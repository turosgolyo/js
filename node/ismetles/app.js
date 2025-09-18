import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [
    { id: 1, name: 'Alex', age: 19 },
    { id: 2, name: 'Bob', age: 20 },
    { id: 3, name: 'Charlie', age: 21 },
    { id: 4, name: 'Daniel', age: 31 },
];

//GET
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = users.find((user) => user.id === id);
    if (!user) {
        res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json(user);
});

//POST
app.post('/users', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ message: 'Invalid credentials!' });
    }
    //const id = users[users.length - 1]?.id + 1 || 1;
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const user = { id, name, age };
    users.push(user);
    res.status(201).json(user);
});

//PUT
app.put("/users/:id", (req, res) => {
    const id = +req.params.id;
    let user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({message: "User not found!"});
    }
    const {name, age} = req.body;
    if(!name || !age){
        return res.status(400).json({message: "Invalid credentials!"});
    }
    const index = users.indexOf(user);
    user = {id: user.id, name: name, age: age};
    users[index] = user;
    res.status(200).json(user);
});

//patch
app.patch("/users/:id", (req, res) => {
    const id = +req.params.id;
    let user = users.find((user) => user.id === id);
    if(!user){
        return res.status(404).json({message: "User not found!"});
    }
    const {name, age} = req.body;
    const index = users.indexOf(user);
    user = {
        id: user.id, 
        name: name || user.name, 
        age: age || user.age
    };
    users[index] = user;
    res.status(200).json(user);
});


//DELETE
app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found!' });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);

    //users = user.filter((user) => user.id !== id);
    res.status(200).json({ message: 'User deleted successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
