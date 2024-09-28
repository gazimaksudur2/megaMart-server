const { ObjectId } = require("mongodb");
const connectDB = require("../db/mongoDB");

async function handleGetBrands(req, res) {
    const db = await connectDB();
    const brandsCollection = db.collection('brands');
    const result = await brandsCollection.find().toArray();
    res.status(200).send(result);
}

async function handleSetBrand(req, res) {
    const db = await connectDB();
    const brandsCollection = db.collection('brands');
    const result = await brandsCollection.insertOne(req.body);
    res.status(200).send(result);
}

async function handlePatchBrand(req, res) {
    const db = await connectDB();
    const brandsCollection = db.collection('brands');
    const categoriesCollection = db.collection('categories');
    const filter = { _id: new ObjectId(req?.query?.id) };
    const data = req.body;
    const brand = await brandsCollection.findOne(filter);
    const category = await categoriesCollection.findOne({ category: brand?.category });
    const brands = category?.brands;
    if (data?.status === 'approved') {
        if (!brand?.categorized) {
            const doc = {
                $set: { categorized: true }
            }
            const newBrands = brands?.length ? [...brands, brand] : [brand];
            await categoriesCollection.updateOne({ category: brand?.category }, { $set: { brands: newBrands } });
            await brandsCollection.updateOne(filter, doc);
            // console.log(newBrands);
        }
    }
    const updatedDoc = {
        $set: { ...data }
    }
    const result = await brandsCollection.updateOne(filter, updatedDoc);
    // console.log(result);
    // res.send({success: true});
    res.send(result);
}

module.exports = {
    handleGetBrands,
    handleSetBrand,
    handlePatchBrand,
}