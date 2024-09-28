const { ObjectId } = require("mongodb");
const connectDB = require("../db/mongoDB");

async function handleGetProducts(req, res) {
    const db = await connectDB();
    const productsCollection = await db.collection('products');
    const result = await productsCollection.find().toArray();
    res.status(200).send(result);
}

async function handleGetProduct(req, res) {
    const db = await connectDB();
    const productsCollection = await db.collection('products');
    const result = await productsCollection.findOne({_id: new ObjectId(req.params.id)})
    res.status(200).send(result);
}

async function handleSetProduct(req, res) {
    const db = await connectDB();
    const productsCollection = await db.collection('products');
    const result = await productsCollection.insertOne(req.body);
    res.status(200).send(result);
}

async function handleDeleteProduct(req, res) {
    const db = await connectDB();
    const productsCollection = await db.collection('products');
    const result = await productsCollection.deleteOne({_id: new ObjectId(req.params.id)});
    res.status(200).send(result);
}

module.exports = {
    handleGetProducts,
    handleSetProduct,
    handleDeleteProduct,
    handleGetProduct,
}