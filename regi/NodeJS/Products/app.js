import products from './data/products.js';
import express from 'express';

const app = express();
const PORT = 3000
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    if(id > products.length || id < 0){
        return res.status(404).json({message: "Product not found!"});
    }
    
    res.status(200).json(products[id]);
});

app.post('/products', (req, res) => {
    const {name, category, price, available} = req.body;

    if(!name || !category || !price || !available){
        return res.json({message: "Missing data!"});
    }

    const newProduct = {name , category, price, available};
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;

    if(id > products.length || id < 0){
        return res.status(404).json({message: "Product not found!"});
    }

    const {name, category, price, available} = req.body;

    if(!name || !category || !price || !available){
        return res.json({message: "Missing data!"});
    }

    products[id] = {name , category, price, available};
    res.status(201).json(products[id]);
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;

    if(id > products.length || id < 0){
        return res.status(404).json({message: "Product not found!"});
    }

    products.splice(id, 1);
    res.json({message: "Delete successful!"})
})