const express = require('express');
const { handleGetAllUsers, handleSetUser, handleGetUser, handleUpdateUser, handleDelete, handlePatchSellerRequest } = require('../controllers/users');
const router = express.Router();


router
    .get('/', handleGetAllUsers)
    .post('/', handleSetUser)
    .patch('/', handlePatchSellerRequest)

router
    .get('/:email', handleGetUser)
    .patch('/:email', handleUpdateUser)
    .delete('/:email', handleDelete)

module.exports = {
    userRouter: router
}