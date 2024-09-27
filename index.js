const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routers/users');
const { categoriesRouter } = require('./routers/categories');
const { brandsRouter } = require('./routers/brands');
const { productsRouter } = require('./routers/products');
const { reviewsRouter } = require('./routers/reviews');
const { questionsRouter } = require('./routers/questions');
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
app.use('/products', productsRouter);
app.use('/reviews', reviewsRouter);
app.use('/questions', questionsRouter);

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

app.listen(port, () => {
    console.log(`megamart is listening at ${port}`);
})