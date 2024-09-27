const { ObjectId } = require("mongodb");
const { getProductsCollection } = require("../db/mongoDB");

async function handleGetProducts(req, res) {
    const result = await getProductsCollection().find().toArray();
    res.status(200).send(result);
}

async function handleGetProduct(req, res) {
    const result = await getProductsCollection().findOne({_id: new ObjectId(req.params.id)})
    res.status(200).send(result);
}

async function handleSetProduct(req, res) {
    const result = await getProductsCollection().insertOne(req.body);
    res.status(200).send(result);
}

async function handleDeleteProduct(req, res) {
    const result = await getProductsCollection().deleteOne({_id: new ObjectId(req.params.id)});
    res.status(200).send(result);
}

module.exports = {
    handleGetProducts,
    handleSetProduct,
    handleDeleteProduct,
    handleGetProduct,
}