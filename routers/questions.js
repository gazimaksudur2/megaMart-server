const express = require("express");
const { handleGetQuestions, handleSetQuestion } = require("../controllers/questions");

const router = express.Router();

router
    .get('/', handleGetQuestions)
    .post('/', handleSetQuestion)

module.exports = {
    questionsRouter: router
}