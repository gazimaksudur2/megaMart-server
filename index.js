const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routers/users');
const { categoriesRouter } = require('./routers/categories');
const { brandsRouter } = require('./routers/brands');
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


app.use('/users', userRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.oknyghy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb://localhost:27017";


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("token in the middleware ", token);
    if (!token) {
        res.status(401).send({ message: "Unauthorized Access!!" });
    } else {
        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401).send({ message: "Unauthorized Access!!" });
            }
            req.user = decoded;
        })
    }
    next();
}

const logger = (req, res, next) => {
    console.log('logged from middleware : ', req.url, req.method);
    next();
}

// require('crypto').randomBytes(64).toString('hex') generate secret access key
app.post('/jwt', (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '1h' });
    // console.log(token);

    res
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        .send({ success: true });
});

app.post('/logout', (req, res) => {
    const user = req.body;
    res
        .clearCookie('token', { maxAge: 0 })
        .send({ success: true });
})


//         app.get('/products', async (req, res) => {
//             const cursor = productsCollection.find();
//             const products = await cursor.toArray();
//             res.send(products);
//         });

//         app.post('/products', verifyToken, async (req, res) => {
//             const product = req.body;
//             // console.log(product);
//             // const cursor = productsCollection.find();
//             // const products = await cursor.toArray();
//             const result = await productsCollection.insertOne(product);
//             // res.send({success: true});
//             res.send(result);
//         });

//         app.get('/product', async (req, res) => {
//             const id = req.query.id;
//             const query = { _id: new ObjectId(id) }
//             const product = await productsCollection.findOne(query);
//             // console.log(product);
//             res.send(product);
//         })

//         app.get('/reviews', async (req, res) => {
//             const id = req.query.id;
//             const query = { _id: new ObjectId(id) }
//             const product = await productsCollection.findOne(query);
//             // console.log(product);
//             res.send(product);
//         })

//         app.post('/reviews', async (req, res) => {
//             const review = req?.body;
//             const filter = { _id: new ObjectId(review?.product_id) };
//             const result = await reviewsCollection.insertOne(review);
//             const product = await productsCollection.findOne(filter);
//             const updatedDoc = {
//                 $set: {
//                     reviews: [...product?.reviews, {
//                         review_id: result?.insertedId,
//                         customer: review?.customer,
//                         review: review?.review,
//                         rating: review?.rating,
//                         reviewedAt: review?.postedAt
//                     }]
//                 }
//             }
//             const result2 = await productsCollection.updateOne(filter, updatedDoc);
//             // console.log(product, result);
//             res.send(result);
//         })

//         app.post('/questions', verifyToken, async (req, res) => {
//             const question = req.body;
//             // console.log(question);
//             const result = await questionsCollection.insertOne(question);
//             // res.send({success: true});
//             res.send(result);
//         })
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }
// run().catch(console.dir);


app.listen(port, () => {
    console.log(`megamart is listening at ${port}`);
})