const express = require("express");
const { jwtLogin, jwtLogout } = require("../controllers/token");

const router = express.Router();

router
    .post('/login', jwtLogin)
    .post('/logout', jwtLogout)

module.exports = {
    jwtRouter: router,
}