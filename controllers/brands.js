const { ObjectId } = require("mongodb");
const { getBrandsCollection, getCategoriesCollection } = require("../db/mongoDB");

async function handleGetBrands(req, res) {
    const result = await getBrandsCollection().find().toArray();
    res.status(200).send(result);
}

async function handleSetBrand(req, res) {
    const result = await getBrandsCollection().insertOne(req.body);
    res.status(200).send(result);
}

async function handlePatchBrand(req, res) {
    const filter = { _id: new ObjectId(req?.query?.id) };
    const data = req.body;
    const brand = await getBrandsCollection().findOne(filter);
    const category = await getCategoriesCollection().findOne({ category: brand?.category });
    const brands = category?.brands;
    if (data?.status === 'approved') {
        if (!brand?.categorized) {
            const doc = {
                $set: { categorized: true }
            }
            const newBrands = brands?.length ? [...brands, brand] : [brand];
            await getCategoriesCollection().updateOne({ category: brand?.category }, { $set: { brands: newBrands } });
            await getBrandsCollection().updateOne(filter, doc);
            // console.log(newBrands);
        }
    }
    const updatedDoc = {
        $set: { ...data }
    }
    const result = await getBrandsCollection().updateOne(filter, updatedDoc);
    // console.log(result);
    // res.send({success: true});
    res.send(result);
}

module.exports = {
    handleGetBrands,
    handleSetBrand,
    handlePatchBrand,
}