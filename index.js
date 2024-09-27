const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routers/users');
const { categoriesRouter } = require('./routers/categories');
const { brandsRouter } = require('./routers/brands');
const { productsRouter } = require('./routers/products');
const { reviewsRouter } = require('./routers/reviews');
const { questionsRouter } = require('./routers/questions');
const { jwtRouter } = require('./routers/token');
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

app.use('/', jwtRouter);
app.use('/users', userRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);
app.use('/products', productsRouter);
app.use('/reviews', reviewsRouter);
app.use('/questions', questionsRouter);



app.listen(port, () => {
    console.log(`megamart is listening at ${port}`);
})