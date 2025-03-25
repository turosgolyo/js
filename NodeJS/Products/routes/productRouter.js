import express from 'express';
const router = express.Router()

const  { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct 
} = require('../controllers/products.js')

router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', createProduct) 

router.put('/:id', updateProduct) 

router.delete('/:id', deleteProduct)

module.exports = router