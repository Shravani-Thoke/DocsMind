const express = require("express");
const router= express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const AIController = require("../controllers/ai.controller");

router.post("/:id/chat", authMiddleware, AIController.chatWithDocument);

router.post("/:id/flashcard-sets", authMiddleware, AIController.createFlashcardSet);
router.get("/:id/flashcard-sets", authMiddleware, AIController.getFlashcardSets);
router.get("/flashcard-sets/:setId", authMiddleware, AIController.getFlashcardsBySet);
router.delete("/flashcard-sets/:setId", authMiddleware, AIController.deleteFlashcardSet);

router.post("/:id/quiz-sets", authMiddleware, AIController.createQuizSet);
router.get("/:id/quiz-sets", authMiddleware, AIController.getQuizSets);
router.get("/quiz-sets/:setId", authMiddleware, AIController.getQuizBySet);

module.exports = router;