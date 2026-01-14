const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware.js");
const aiOptimized = require("../Controller/aiController.js");
const router = express.Router();

// router.use(authMiddleware);
router.post("/optimize-task",authMiddleware, aiOptimized.optimizeTask);

module.exports = router;