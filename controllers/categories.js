const { getCategoriesCollection } = require("../db/mongoDB");
const { client } = require("../db/mongoDB");

const categoriesCollection = client.db("megaMart").collection("categories");

async function handleGetCategories(req, res) {
    const result = await categoriesCollection.find().toArray();
    res.send(result)
}

module.exports = {
    handleGetCategories
}