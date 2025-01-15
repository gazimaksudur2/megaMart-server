const express = require("express");
const router = express.Router();
const { handleGetBrands, handleSetBrand, handlePatchBrand } = require("../controllers/brands");

router
    .get('/', handleGetBrands)
    .post('/', handleSetBrand)
    .patch('/', handlePatchBrand)

module.exports = {
    brandsRouter: router
}