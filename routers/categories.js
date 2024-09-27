const express = require("express");
const { handleGetCategories } = require("../controllers/categories");

const router = express.Router();

router
    .get('/', handleGetCategories)

module.exports = {
    categoriesRouter: router
}