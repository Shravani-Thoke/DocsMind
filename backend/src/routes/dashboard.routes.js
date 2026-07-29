const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const DashboardController = require("../controllers/dashboard.controller");

router.get("/", authMiddleware, DashboardController.getDashboard);

module.exports = router;