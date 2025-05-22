import express from 'express'
import * as db from './util/database.js'

const PORT = 8080
const app = express()
app.use(express.json())

app.get('/users', (req, res) => {
    try {
        const users = db.getUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({message: `${err}`})
    }
})

app.post('/users', (req, res) => {
    try {
        const {name, age} = req.body
        if(!name || !age){
            return res.status(404).json({message: 'Invalid credentials'})
        }
        const savedUser = db.saveUser(name, age)
        if(savedUser.changes != 1){
            return res.status(501).json({message: 'User save failed'})
        }
        res.status(201).json({id: savedUser.lastInsertRowid, name, age})
    } catch (err) {
        res.status(500).json({message: `${err}`})
    }
})

app.put('/users/:id', (req, res) => {
    try {
        const {name, age} = req.body
        if(!name || !age){
            return res.status(404).json({message: 'Invalid credentials'})
        }
        const id = +req.params.id
        const updatedUser = db.updateUser(name, age)
        if(updatedUser.changes != 1){
            return res.status(501).json({message: 'User update failed'})
        }
        res.status(200).json({id, name, age})
    } catch (err) {
        res.status(500).json({message: `${err}`})
    }
})

app.delete('/users/:id', (req, res) => {
    try {
        const deletedUser = db.deleteUser(req.params.id)
        if(deletedUser.changes != 1){
            return res.status(501).json({message: 'User delete failed'})
        }
        res.status(200).json({message: 'Delete successful'})
    } catch (err) {
        res.status(500).json({message: `${err}`})
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})