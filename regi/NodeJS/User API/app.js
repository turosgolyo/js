import express from 'express';
import path from 'path';
import __dirname from './util/roothpath.js';
import * as fileHandler from "./util/filekezeles.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

let users = [
  { "firstName": "Harry", "lastName": "Potter" },
  { "firstName": "Ronald", "lastName": "Bilius Weasley" },
  { "firstName": "Hermione", "lastName": "Jean Granger" },
  { "firstName": "Draco", "lastName": "Malfoy" },
  { "firstName": "Cedric", "lastName": "Diggory" },
  { "firstName": "Luna", "lastName": "Lovegood" }
]

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/users', (req, res) => {
  const users = fileHandler.getData();
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const users = fileHandler.getData();
  const id = parseInt(req.params.id);
  
  //létező id vizsgálás
  if(id < 0 || id >= users.length){
    return res.json({});
  }

  res.json(users[id]);
});

app.post('/users', (req, res) => {
  const users = fileHandler.getData();
  const {firstName, lastName} = req.body;
  
  if(!firstName || !lastName){
    return res.json({ message: "Missing data!" })
  }
  
  const newUser = {firstName, lastName}
  users.push(newUser);
  fileHandler.saveData(users);
  res.send(newUser);
});

app.put('/users/:id', (req, res) => {
  const users = fileHandler.getData();
  const id = req.params.id;

  //létező id vizsgálás
  if(id < 0 && id >= users.length){
    return res.json({ message: "User not found!" });
  }
  
  const { firstName, lastName } = req.body;
  
  if(!firstName || !lastName){
    return res.json({ message: "Missing data!" })
  }

  users[id] = { firstName, lastName };
  res.json(users[id]);
});

app.patch('/users/:id', (req, res) => {
  const users = fileHandler.getData();
  const id = req.params.id;
  
  //létező id vizsgálás
  if(id < 0 && id >= users.length){
    return res.json({ message: "User not found!" });
  }

  const { firstName, lastName } = req.body;
  
  users[id] = { 
    firstName: firstName || users[id].firstName, 
    lastName: lastName || users[id].lastName
  };
  
  res.json(users[id]);
});

app.delete('/users/:id', (req, res) => {
  const users = fileHandler.getData();
  const id = parseInt(req.params.id);
  
  //létező id vizsgálás
  if(id < 0 || id >= users.length){
    return res.json({ message: "User not found!" });
  }
  
  users.splice(id, 1);
  res.json({ message: "Delete successful" });
});

