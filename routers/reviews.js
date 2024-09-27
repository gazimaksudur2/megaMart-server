const express = require("express");
const { handleGetReviews, handleSetReview } = require("../controllers/reviews");

const router = express.Router();

router
    .get('/', handleGetReviews)
    .post('/', handleSetReview)

module.exports = {
    reviewsRouter: router
}