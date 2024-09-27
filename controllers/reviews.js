const { ObjectId } = require("mongodb");
const { getReviewsCollection, getProductsCollection } = require("../db/mongoDB");

async function handleGetReviews(req, res) {
    const result = await getReviewsCollection().find().toArray();
    res.status(200).send(result);
}

async function handleSetReview(req, res) {
    const review = req?.body;
    const filter = { _id: new ObjectId(review?.product_id) };
    const result = await getReviewsCollection().insertOne(review);
    const product = await getProductsCollection().findOne(filter);
    const updatedDoc = {
        $set: {
            reviews: [...product?.reviews, {
                review_id: result?.insertedId,
                customer: review?.customer,
                review: review?.review,
                rating: review?.rating,
                reviewedAt: review?.postedAt
            }]
        }
    }
    const result2 = await getProductsCollection().updateOne(filter, updatedDoc);
    // console.log(product, result);
    res.send(result);
}

module.exports = {
    handleGetReviews,
    handleSetReview
}