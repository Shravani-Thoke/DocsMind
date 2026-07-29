const mongoose = require("mongoose");

const flashcardSetSchema = new mongoose.Schema({
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
        default: "Untitled Flashcard Set"
    },
    totalCards:{
        type:Number,
        default:0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
},{
    timestamps:true
})

flashcardSetSchema.index({ documentId: 1,createdAt: -1 });

const FlashcardSetModel=mongoose.model("FlashcardSet",flashcardSetSchema);

module.exports=FlashcardSetModel;