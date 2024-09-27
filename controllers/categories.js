const { getCategoriesCollection } = require("../db/mongoDB");

async function handleGetCategories(req, res) {
    const result = await getCategoriesCollection().find().toArray();
    res.send(result)
}

module.exports = {
    handleGetCategories
}