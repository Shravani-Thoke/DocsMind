const DocumentModel = require("../models/document.model");

const getDashboard = async (req, res) => {
  const documents = await DocumentModel.find({
    userId: req.user.id,
  });

  const totalDocuments = documents.length;

  const totalFlashcards = documents.reduce(
    (sum, doc) => sum + doc.flashcardsCount,
    0,
  );

  const totalQuizzes = documents.reduce(
    (sum, doc) => sum + doc.quizzesCount,
    0,
  );

  const recentDocuments = await DocumentModel.find({
    userId: req.user.id,
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("_id fileName createdAt");

  const stats = {
    totalDocuments,
    totalFlashcards,
    totalQuizzes,
  };

  res.json({
    stats,
    recentDocuments,
  });
};

module.exports = {
  getDashboard,
};
