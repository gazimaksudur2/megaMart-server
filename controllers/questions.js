const connectDB = require("../db/mongoDB");

async function handleGetQuestions(req, res) {
    const db = await connectDB();
    const questionsCollection = db.collection('questions');
    const result = await questionsCollection.find().toArray();
    res.status(200).send(result);
}

async function handleSetQuestion(req, res) {
    const db = await connectDB();
    const questionsCollection = db.collection('questions');
    const productsCollection = db.collection('products');
    const question = req?.body;
    const filter = { _id: new ObjectId(question?.product_id) };
    const result = await questionsCollection.insertOne(question);
    const product = await productsCollection.findOne(filter);
    const updatedDoc = {
        $set: {
            questions: [...product?.questions, {
                question_id: result?.insertedId,
                customer: question?.customer,
                question: question?.question,
                rating: question?.rating,
                questionedAt: question?.postedAt
            }]
        }
    }
    const result2 = await productsCollection.updateOne(filter, updatedDoc);
    // console.log(product, result);
    res.send(result);
}

module.exports = {
    handleGetQuestions,
    handleSetQuestion
}