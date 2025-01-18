const express = require("express");
const { handleGetProducts, handleSetProduct, handleDeleteProduct, handleGetProduct, handlePatchProducts } = require("../controllers/products");

const router = express.Router();

router
    .get('/', handleGetProducts)
    .post('/', handleSetProduct)
    .patch('/', handlePatchProducts)

router
    .get('/:id', handleGetProduct)
    .delete('/:id', handleDeleteProduct)

module.exports = {
    productsRouter: router
}