const { uploadPdfToSupabase } = require("../services/supabaseUpload");
const DocumentModel = require("../models/document.model");
const supabase = require("../config/supabase");
const pdfParse = require("pdf-parse");
const FlashcardSetModel = require("../models/flashcardset.model");
const FlashcardModel = require("../models/flashcard.model");
const QuizSetModel = require("../models/quizset.model");
const QuizQuestionModel = require("../models/quizQuestion.model");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.file.buffer) {
      return res
        .status(400)
        .json({ message: "Uploaded file buffer is missing" });
    }

    //Upload to Supabase
    const fileUrl = await uploadPdfToSupabase(req.file, req.user.id);

    // Extract Text
    let extractedText = "";

    try {
      const pdfData = await pdfParse(req.file.buffer);
      extractedText = pdfData.text || "";

      console.log("Buffer size:", req.file.buffer.length);
      console.log("Extracted text length:", extractedText.length);
    } catch (parseErr) {
      console.error("PDF parse failed:", parseErr);

      return res.status(400).json({
        message: "Failed to parse PDF",
        error: parseErr.message,
      });
    }

    // Save to MongoDB
    const doc = await DocumentModel.create({
      userId: req.user.id,
      title: req.file.originalname,
      fileName: req.file.originalname,
      filePath: fileUrl,
      fileSize: req.file.size,
      status: extractedText.length > 0 ? "ready" : "failed",
      extractedText,
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      doc,
    });
  } catch (err) {
    console.error("Upload failed:", err);

    res.status(500).json({
      message: "Error uploading document",
      error: err.message,
    });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await DocumentModel.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching documents",
      error: error.message,
    });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await DocumentModel.findOne({
      _id: id,
      userId: req.user.id,
    });
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ doc });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching document",
      error: error.message,
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await DocumentModel.findById(id);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    //ownership check
    if (doc.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this document" });
    }

    //delete from supabase
    const filePath = doc.filePath.split("/documents/")[1];

    const { error } = await supabase.storage
      .from("documents")
      .remove([filePath]);

    if (error) throw error;

    // ===============================
    // Delete Flashcards & Flashcard Sets
    // ===============================

    const flashcardSets = await FlashcardSetModel.find({
      documentId: id,
    });

    const flashcardSetIds = flashcardSets.map((set) => set._id);

    await FlashcardModel.deleteMany({
      flashcardSetId: { $in: flashcardSetIds },
    });

    await FlashcardSetModel.deleteMany({
      documentId: id,
    });

    // ===============================
    // Delete Quiz Questions & Quiz Sets
    // ===============================

    const quizSets = await QuizSetModel.find({
      documentId: id,
    });

    const quizSetIds = quizSets.map((set) => set._id);

    await QuizQuestionModel.deleteMany({
      quizSetId: { $in: quizSetIds },
    });

    await QuizSetModel.deleteMany({
      documentId: id,
    });

    // ===============================
    // Finally delete the document
    // ===============================

    await doc.deleteOne();

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting document",
      error: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
};
