const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
    ],
    credentials: true,
}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("megamart is running...");
})

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.oknyghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb://localhost:27017";


const verifyToken = (req, res, next)=>{
    const token = req.cookies.token;
    // console.log("token in the middleware ", token);
    if(!token){
        req.status(401).send({message: "Unauthorized Access!!"});
    }else{
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded)=>{
            if(err){
                res.status(401).send({message: "Unauthorized Access!!"});
            }
            req.user = decoded;
        })
    }
    next();
}

const logger = (req, res, next)=> {
    console.log('logged from middleware : ', req.url, req.method);
    next();
}

// require('crypto').randomBytes(64).toString('hex') generate secret access key
app.post('/jwt', (req, res)=>{
    const user = req.body;
    const token = jwt.sign({user},process.env.SECRET_ACCESS_TOKEN,{expiresIn: '1h'});
    res
    .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    })
    .send({success: true});
});

app.post('/logout', (req, res)=>{
    const user = req.body;
    res
    .clearCookie('token',{maxAge: 0})
    .send({success: true});
})

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

        app.get('/user', verifyToken, async(req, res)=>{
            // const id = req.query.id;
            let filter = null;
            if(req?.query?.id){
                filter = {_id: new ObjectId(req?.query?.id)}
            }else if(req?.query?.email){
                filter = {email: req.query.email}
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