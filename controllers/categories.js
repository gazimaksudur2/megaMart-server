const connectDB = require("../db/mongoDB");

async function handleGetCategories(req, res) {
    const db = await connectDB();
    const categoriesCollection = await db.collection('categories');
    const result = await categoriesCollection.find().toArray();
    res.send(result)
}

module.exports = {
    handleGetCategories
}