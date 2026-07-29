const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    quizSetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizSet",
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message: "Each question must have exactly 4 options",
      },
    },
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    explanation: {
      type: String,
    },
  },
  { timestamps: true }
);

quizQuestionSchema.index({ quizSetId: 1, createdAt: -1 });

const QuizQuestionModel = mongoose.model("QuizQuestion", quizQuestionSchema);

module.exports = QuizQuestionModel;