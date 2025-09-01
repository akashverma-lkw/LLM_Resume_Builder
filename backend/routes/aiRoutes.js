import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateSummary, generateCoverLetter, atsScore, resumeAnalytics  } from "../controllers/aiController.js";

const router = express.Router();

// Protected AI Routes
router.post("/summary", protect, generateSummary);
router.post("/cover-letter", protect, generateCoverLetter);
router.post("/ats-score", protect, atsScore);
router.post("/analytics", protect, resumeAnalytics);

export default router;
