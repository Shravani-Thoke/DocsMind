const mongoose = require("mongoose");

const quizSetSchema = new mongoose.Schema({
    documentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    totalQuestions:{
        type:Number,
        required:true,
        default:0
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
},{
    timestamps:true
})

quizSetSchema.index({ documentId: 1, createdAt: -1 });
const QuizSetModel=mongoose.model("QuizSet",quizSetSchema);

module.exports=QuizSetModel;