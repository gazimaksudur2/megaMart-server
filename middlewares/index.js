const jwt = require("jsonwebtoken");
const { getUsersCollection } = require("../db/mongoDB");

function verifyToken (req, res, next) {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded)=>{
            if(err){
                res.status(401).send({message: "Unauthorized Access!"});
            }
            req.user = decoded;
        })
    }else{
        res.status(401).send({message: "Unauthorized Access!"});
    }
    next();
}

async function verifyAdmin (req, res, next){
    const user = await getUsersCollection().findOne({email: req.user.email});
    if(user.role !== 'admin'){
        res.status(403).send({message: "Forbidden Access!"});
    }
    next();
}

async function verifyUser (req, res, next){
    if(req.params.email !== req.user.email){
        res.status(403).send({message: "Forbidden Access!"});
    }
    next();
}

const logger = (req, res, next) => {
    console.log('logged from middleware : ', req.url, req.method);
    next();
}

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyUser,
    logger
}