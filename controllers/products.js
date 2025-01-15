const { ObjectId } = require("mongodb");
// const { getProductsCollection } = require("../db/mongoDB");
const { client } = require("../db/mongoDB");

const productsCollection = client.db("megaMart").collection("products");

async function handleGetProducts(req, res) {
    const id = req.query?.id;
    let result = {success: true};
    if(id){
        result = await productsCollection.findOne({ _id: new ObjectId(id) });
    }else result = await productsCollection.find().toArray();
    res.status(200).send(result);
}

async function handleGetProduct(req, res) {
    
    res.status(200).send(result);
}

async function handleSetProduct(req, res) {
    const result = await productsCollection.insertOne(req.body);
    res.status(200).send(result);
}

async function handleDeleteProduct(req, res) {
    const id = req.query?.id;
    const result = await productsCollection.deleteOne({_id: new ObjectId(req.params.id)});
    res.status(200).send(result);
}

module.exports = {
    handleGetProducts,
    handleSetProduct,
    handleDeleteProduct,
    handleGetProduct,
}