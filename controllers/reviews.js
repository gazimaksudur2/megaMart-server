const { ObjectId } = require("mongodb");
const connectDB = require("../db/mongoDB");

async function handleGetReviews(req, res) {
    const db = await connectDB();
    const reviewsCollection = await db.collection('reviews');
    const result = await reviewsCollection.find().toArray();
    res.status(200).send(result);
}

async function handleSetReview(req, res) {
    const db = await connectDB();
    const reviewsCollection = await db.collection('reviews');
    const productsCollection = await db.collection('products');
    const review = req?.body;
    const filter = { _id: new ObjectId(review?.product_id) };
    const result = await reviewsCollection.insertOne(review);
    const product = await productsCollection.findOne(filter);
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
    const result2 = await productsCollection.updateOne(filter, updatedDoc);
    // console.log(product, result);
    res.send(result);
}

module.exports = {
    handleGetReviews,
    handleSetReview
}