import express from "express";
import protect from "../middleware/authMiddleware.js";
import { uploadResume, createResume, getResumes, getResumeById, updateResume, deleteResume } from "../controllers/resumeController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);
router.post("/upload", protect, upload.single("resume"), uploadResume);

export default router;
