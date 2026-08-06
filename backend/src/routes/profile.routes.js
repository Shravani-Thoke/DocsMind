const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const ProfileController = require("../controllers/profile.controller");

router.get("/", authMiddleware, ProfileController.getProfile);

module.exports = router;