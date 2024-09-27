const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.oknyghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let usersCollection, productsCollection, categoriesCollection, brandsCollection, reviewsCollection, questionsCollection;

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db("megaMart");

        productsCollection = database.collection('products');
        categoriesCollection = database.collection('categories');
        brandsCollection = database.collection('brands');
        reviewsCollection = database.collection('reviews');
        questionsCollection = database.collection('questions');
        usersCollection = database.collection('users');
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

module.exports = {
    getUsersCollection: () => usersCollection,
    getProductsCollection: ()=> productsCollection,
    getCategoriesCollection: ()=> categoriesCollection,
    getReviewsCollection: ()=> reviewsCollection,
    getBrandsCollection: ()=> brandsCollection,
    getQuestionsCollection: ()=> questionsCollection
}