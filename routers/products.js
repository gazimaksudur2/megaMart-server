const express = require("express");
const { handleGetProducts, handleSetProduct, handleDeleteProduct, handleGetProduct } = require("../controllers/products");

const router = express.Router();

router
    .get('/', handleGetProducts)
    .post('/', handleSetProduct)

router
    .get('/:id', handleGetProduct)
    .delete('/:id', handleDeleteProduct)

module.exports = {
    productsRouter: router
}