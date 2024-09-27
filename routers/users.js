const express = require('express');
const { handleGetAllUsers, handleSetUser, handleGetUser, handleUpdateUser, handleDelete } = require('../controllers/users');
const router = express.Router();


router
    .get('/', handleGetAllUsers)
    .post('/', handleSetUser)

router
    .get('/:email', handleGetUser)
    .patch('/:email', handleUpdateUser)
    .delete('/:email', handleDelete)

module.exports = {
    userRouter: router
}