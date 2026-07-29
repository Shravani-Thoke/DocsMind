const DocumentModel = require("../models/document.model");
const FlashcardModel = require("../models/flashcard.model");
const FlashcardSetModel = require("../models/flashcardset.model");
const QuizQuestionModel = require("../models/quizQuestion.model");
const QuizSetModel = require("../models/quizset.model");
const {
  generateChatResponse,
  generateQuiz,
} = require("../services/ai.service");
const { generateFlashcards } = require("../services/ai.service");

const chatWithDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }

    const doc = await DocumentModel.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const reply = await generateChatResponse(doc.extractedText, message);

    res.json({ reply });
  } catch (err) {
    console.error("AI Controller error:", err);
    res.status(500).json({ message: "Chat failed" });
  }
};

const createFlashcardSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { title = "New Set", count = 10 } = req.body || {};
    const parsedCount = Number(count);

    if (!Number.isInteger(parsedCount) || parsedCount < 1 || parsedCount > 50) {
      return res.status(400).json({
        message: "count must be between 1 and 50",
      });
    }

    const doc = await DocumentModel.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (!doc.extractedText?.trim()) {
      return res.status(400).json({
        message:
          "Document has no extracted text. Re-upload or reprocess first.",
      });
    }

    const aiRaw = await generateFlashcards(doc.extractedText, parsedCount);
    const aiResult =
      typeof aiRaw === "string"
        ? JSON.parse(
            aiRaw
              .replace(/^```json\s*/i, "")
              .replace(/^```\s*/i, "")
              .replace(/\s*```$/, "")
              .trim(),
          )
        : aiRaw;

    if (
      !Array.isArray(aiResult?.flashcards) ||
      aiResult.flashcards.length === 0
    ) {
      return res.status(500).json({
        message: "AI did not return valid flashcards",
        raw: aiRaw,
      });
    }
    //Sanitize AI output
    const sanitizedCards = aiResult.flashcards
      .filter(
        (card) =>
          typeof card.question === "string" &&
          card.question.trim().length > 0 &&
          typeof card.answer === "string" &&
          card.answer.trim().length > 0,
      )
      .map((card) => ({
        question: card.question.trim(),
        answer: card.answer.trim(),
      }));

   
    const finalCards = sanitizedCards.slice(0, parsedCount);

    if (finalCards.length < parsedCount) {
      return res.status(500).json({
        message: `AI returned only ${finalCards.length} valid flashcards. Try again.`,
      });
    }

    //Create set AFTER validation
    const newSet = await FlashcardSetModel.create({
      documentId: id,
      userId: req.user.id,
      title,
      totalCards: finalCards.length,
    });

    //  Insert cards
    const flashcardsToInsert = finalCards.map((card) => ({
      setId: newSet._id,
      ...card,
    }));

    const savedCards = await FlashcardModel.insertMany(flashcardsToInsert);

    await DocumentModel.findByIdAndUpdate(id, {
      $inc: { flashcardsCount: 1 },
    });

    res.json({
      set: newSet,
      flashcards: savedCards,
    });
  } catch (err) {
    console.error("createFlashcardSet error:", err);
    res
      .status(500)
      .json({ message: "Failed to create flashcard set", error: err.message });
  }
};

const getFlashcardSets = async (req, res) => {
  try {
    const { id } = req.params;

    const sets = await FlashcardSetModel.find({
      documentId: id,
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ sets });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sets" });
  }
};

const getFlashcardsBySet = async (req, res) => {
  try {
    const { setId } = req.params;

    const set = await FlashcardSetModel.findOne({
      _id: setId,
      userId: req.user.id,
    });

    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }

    const flashcards = await FlashcardModel.find({ setId });

    res.json({ flashcards });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch flashcards" });
  }
};

const deleteFlashcardSet = async (req, res) => {
  try {
    const { setId } = req.params;
    const userId = req.user.id;

    const set = await FlashcardSetModel.findOne({
      _id: setId,
      userId,
    });

    if (!set) {
      return res.status(404).json({
        message: "Flashcard set not found",
      });
    }

    await FlashcardModel.deleteMany({ setId });
    await FlashcardSetModel.findByIdAndDelete(setId);
    await DocumentModel.findByIdAndUpdate(set.documentId, {
      $inc: { flashcardsCount: -1 },
    });

    return res.json({
      message: "Flashcard set deleted successfully",
    });
  } catch (err) {
    console.error("Delete flashcard set error:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const createQuizSet = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionCount = 5 } = req.body || {};
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "Missing document id" });
    }

    const parsedQuestionCount = Number(questionCount);
    if (
      !Number.isInteger(parsedQuestionCount) ||
      parsedQuestionCount < 1 ||
      parsedQuestionCount > 20
    ) {
      return res
        .status(400)
        .json({ message: "questionCount must be an integer between 1 and 20" });
    }

    const doc = await DocumentModel.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (!doc.extractedText?.trim()) {
      return res.status(400).json({
        message:
          "Document has no extracted text. Re-upload or reprocess first.",
      });
    }

    const count = await QuizSetModel.countDocuments({ documentId: doc._id });
    const quizTitle = `${doc.title} - Quiz ${count + 1}`;

    const aiRaw = await generateQuiz(doc.extractedText, parsedQuestionCount);
    const aiResult =
      typeof aiRaw === "string"
        ? JSON.parse(
            aiRaw
              .replace(/^```json\s*/i, "")
              .replace(/^```\s*/i, "")
              .replace(/\s*```$/, "")
              .trim(),
          )
        : aiRaw;

    if (
      !Array.isArray(aiResult?.questions) ||
      aiResult.questions.length === 0
    ) {
      return res.status(500).json({
        message: "AI did not return valid quiz questions",
        raw: aiRaw,
      });
    }

    const sanitizedQuestions = aiResult.questions
      .filter((q) => Array.isArray(q.options) && q.options.length >= 4)
      .map((q) => ({
        question: q.question,
        options: q.options.slice(0, 4),
        correctAnswerIndex:
          Number.isInteger(q.correctAnswerIndex) &&
          q.correctAnswerIndex >= 0 &&
          q.correctAnswerIndex < 4
            ? q.correctAnswerIndex
            : 0,
        explanation: q.explanation || "",
      }));

    const finalQuestions = sanitizedQuestions.slice(0, parsedQuestionCount);

    if (finalQuestions.length < parsedQuestionCount) {
      return res.status(500).json({
        message: `AI returned only ${finalQuestions.length} valid questions. Try again.`,
      });
    }

    const quizSet = await QuizSetModel.create({
      documentId: doc._id,
      userId,
      title: quizTitle,
      totalQuestions: finalQuestions.length,
    });

    const questionsToInsert = finalQuestions.map((q) => ({
      quizSetId: quizSet._id,
      ...q,
    }));

    const savedQuestions =
      await QuizQuestionModel.insertMany(questionsToInsert);

    await DocumentModel.findByIdAndUpdate(doc._id, {
      $inc: { quizzesCount: 1 },
    });

    console.log("Requested questionCount:", parsedQuestionCount);
    console.log("AI returned:", aiResult.questions.length);
    console.log("Final sanitized count:", finalQuestions.length);

    res.status(201).json({
      message: "Quiz created successfully",
      quizSetId: quizSet._id,
      questions: savedQuestions,
    });
  } catch (err) {
    console.error("Create quiz error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getQuizSets = async (req, res) => {
  try {
    const { id } = req.params;

    const sets = await QuizSetModel.find({
      documentId: id,
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({ sets });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Failed to fetch quiz sets" });
  }
};

const getQuizBySet = async (req, res) => {
  try {
    const { setId } = req.params;
    const questions = await QuizQuestionModel.find({ quizSetId: setId });
    res.json({ questions });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Failed to fetch quiz questions" });
  }
};

module.exports = {
  chatWithDocument,

  createFlashcardSet,
  getFlashcardSets,
  getFlashcardsBySet,
  deleteFlashcardSet,

  createQuizSet,
  getQuizSets,
  getQuizBySet,
};
