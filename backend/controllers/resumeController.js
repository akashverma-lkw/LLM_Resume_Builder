// src/controllers/resumeController.js
import fs from "fs";
import pdfParse from "pdf-parse";
import Resume from "../models/Resume.js";
import ResumeUpload from "../models/resumeUpload.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CREATE Resume
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({ ...req.body, user: req.user._id });
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Resumes for user
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Resume
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Resume
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ANALYZE Resume (parse PDF text only)
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const pdfBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(pdfBuffer);

    res.json({ text: data.text });
  } catch (error) {
    console.error("Analyze Resume Error:", error);
    res.status(500).json({ message: "Failed to analyze resume" });
  }
};

// UPLOAD & ANALYZE Resume (simplified)
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // PDF Buffer → Text extract
    const data = await pdfParse(req.file.buffer);

    // AI ke liye send karne ke liye response
    res.json({
      extractedText: data.text,
      atsScore: null, // baad me AI se calculate karoge
    });
  } catch (err) {
    res.status(500).json({ message: "Error processing resume" });
  }
};

export const generateATSScore = async (req, res) => {
  try {
    const { userId, jobDescription } = req.body;

    if (!userId || !jobDescription) {
      return res.status(400).json({ message: "User ID and Job Description required" });
    }

    const resume = await ResumeUpload.findOne({ user: userId }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({ message: "No resume found for this user" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Compare the following resume with the given job description. 
      Give a score out of 100 based on ATS (Applicant Tracking System) standards 
      and also list matching skills, missing skills, and recommendations.

      Resume:
      ${resume.extractedText}

      Job Description:
      ${jobDescription}
    `;

    const result = await model.generateContent(prompt);

    res.json({ atsScore: result.response.text() });

  } catch (error) {
    console.error("ATS Score Error:", error);
    res.status(500).json({ message: "Error generating ATS score" });
  }
};