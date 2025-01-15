const express = require("express");
const { client } = require("../db/mongoDB");
const router = express.Router();

const cartsCollection = client.db('megaMart').collection('carts');

router
    .get('/', async(req, res)=>{
        let carts = {success: true};
        if(req.query?.email){
            carts = await cartsCollection.find({email: req.query.email}).toArray();
        } else carts = await cartsCollection.find().toArray();
        res.json(carts);
    })
    .post('/', async(req, res)=>{
        const cart = req.body;
        const result = await cartsCollection.insertOne(cart);
        res.send(result);
    })



module.exports = {
    cartsRouter: router
}