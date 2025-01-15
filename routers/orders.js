const express = require('express');
const { handleGetOrder, handlePostOrder } = require('../controllers/orders');
const router = express.Router();

router
    .get('/', handleGetOrder)
    .post('/', handlePostOrder)


module.exports = {
    ordersRouter: router
}