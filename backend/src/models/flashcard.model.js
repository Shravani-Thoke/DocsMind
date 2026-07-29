const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  setId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FlashcardSet",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, { timestamps: true });

flashcardSchema.index({ setId: 1 });

const FlashcardModel = mongoose.model("Flashcard", flashcardSchema);

module.exports=FlashcardModel;