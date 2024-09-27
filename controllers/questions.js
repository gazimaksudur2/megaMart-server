const { getQuestionsCollection } = require("../db/mongoDB");

async function handleGetQuestions(req, res) {
    const result = await getQuestionsCollection().find().toArray();
    res.status(200).send(result);
}

async function handleSetQuestion(req, res) {
    const question = req?.body;
    const filter = { _id: new ObjectId(question?.product_id) };
    const result = await getQuestionsCollection().insertOne(question);
    const product = await getProductsCollection().findOne(filter);
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
    const result2 = await getProductsCollection().updateOne(filter, updatedDoc);
    // console.log(product, result);
    res.send(result);
}

module.exports = {
    handleGetQuestions,
    handleSetQuestion
}