const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const FlashcardsController = require("../controllers/flashcards.controller");

router.get("/", authMiddleware, FlashcardsController.getAllFlashcardSets);

module.exports = router;