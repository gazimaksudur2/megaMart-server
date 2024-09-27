const express = require("express");
const { handleGetBrands, handleSetBrand, handlePatchBrand } = require("../controllers/brands");

const router = express.Router();

router
    .get('/', handleGetBrands)
    .post('/', handleSetBrand)
    .patch('/', handlePatchBrand)

module.exports = {
    brandsRouter: router
}