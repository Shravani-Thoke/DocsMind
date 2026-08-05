const FlashcardSetModel = require("../models/flashcardset.model");

const getAllFlashcardSets = async (req, res) => {
  try {
    const sets = await FlashcardSetModel.find({
      userId: req.user.id,
    })
      .populate("documentId", "fileName")
      .sort({ createdAt: -1 });

    const flashcardSets = sets.map((set) => ({
      _id: set._id,
      title: set.title,
      documentName: set.documentId?.fileName,
      cardsCount: set.totalCards,
      createdAt: set.createdAt,
    }));

    res.status(200).json({ flashcardSets });
  } catch (err) {
    res.status(500).json({
       message: err.message,
    });
  }
};
module.exports = {
    getAllFlashcardSets
}