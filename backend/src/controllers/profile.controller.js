const UserModel = require("../models/users.model");
const DocumentModel = require("../models/document.model");
const FlashcardSetModel = require("../models/flashcardset.model");
const QuizSetModel = require("../models/quizset.model");

const getProfile=async (req, res) => {
    try{
        const userId = req.user.id;

        const user=await UserModel.findById(userId).select("name email createdAt");

        const totalDocuments=await DocumentModel.countDocuments({ userId });
        const totalFlashcards=await FlashcardSetModel.countDocuments({ userId });
        const totalQuizzes=await QuizSetModel.countDocuments({ userId });

        res.status(200).json({
            user,
            stats:{
                totalDocuments,
                totalFlashcards,
                totalQuizzes
            }
        })
    }
    catch(error){
        res.json({ message: error.message });
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports={
    getProfile
}