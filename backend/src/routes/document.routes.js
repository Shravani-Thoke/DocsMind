const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const DocumentController = require("../controllers/document.controller");
const upload = require("../middlewares/multer");

const handleUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post(
  "/upload",
  authMiddleware,
  handleUpload,
  DocumentController.uploadDocument
);

router.get("/getAllDocuments", authMiddleware, DocumentController.getAllDocuments);

router.get('/:id',authMiddleware,DocumentController.getDocumentById);

router.delete('/:id',authMiddleware,DocumentController.deleteDocument);

module.exports = router;
