const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtLogin(req, res) {
    // res.send("you are in jsonwebtoken login route")
    const user = req.body;
    const token = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '1h' });

    res
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .send({
            success: true
        })
}

function jwtLogout(req, res) {
    res
        .clearCookie('token', {maxAge: 0})
        .send({success: true});
}

module.exports = {
    jwtLogin,
    jwtLogout
}