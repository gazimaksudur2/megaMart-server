const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("megamart is running...");
})

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.oknyghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const productsCollection = client.db('megaMart').collection('products');
        const usersCollection = client.db('megaMart').collection('users');

        app.post('/users', async(req, res)=>{
            // console.log(req.body);
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        app.get('/users', async(req, res)=>{
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        app.get('/user', async(req, res)=>{
            // const id = req.query.id;
            let filter = null;
            if(req?.query?.id){
                filter = {_id: new ObjectId(req?.query?.id)}
            }else if(req?.query?.email){
                filter = {mail: req.query.email}
            }else if(req?.query?.username){
                filter = {username: req.query.username};
            }else{
                res.send('user query not found.')
            }
            const result = await usersCollection.findOne(filter) || {user: 'user not found'};
            res.send(result);
        });

        app.get('/products', async(req, res)=>{
            const cursor = productsCollection.find();
            const products = await cursor.toArray();
            res.send(products);
        });

        app.get('/product', async(req, res)=>{
            const id = req.query.id;
            const query = { _id: new ObjectId(id) }
            const product = await productsCollection.findOne(query);
            // console.log(product);
            res.send(product);
        })
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`megamart is listening at ${port}`);
})