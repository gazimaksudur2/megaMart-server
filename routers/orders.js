const express = require('express');
const { handleGetOrder, handlePostOrder, handlePatchOrder } = require('../controllers/orders');
const router = express.Router();

router
    .get('/', handleGetOrder)
    .post('/', handlePostOrder)
    .patch('/', handlePatchOrder)


module.exports = {
    ordersRouter: router
}