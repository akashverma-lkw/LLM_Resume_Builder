import genAI from "../config/geminiAPI.js";

// Generate AI Resume Summary
export const generateSummary = async (req, res) => {
  try {
    const { fullName, skills, experience, projects } = req.body;

    // Prompt for LLM
    const prompt = `
    Create a professional resume summary for ${fullName}.
    Skills: ${skills.join(", ")}
    Experience: ${experience.map((exp) => `${exp.role} at ${exp.company}`).join(", ")}
    Projects: ${projects.map((p) => p.title).join(", ")}
    Keep it concise (3-4 sentences).
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    console.error("AI Summary Error:", error.message);
    res.status(500).json({ message: "Failed to generate summary" });
  }
};

// Generate AI Cover Letter
export const generateCoverLetter = async (req, res) => {
  try {
    const { fullName, skills, experience, jobTitle, companyName } = req.body;

    const prompt = `
    Write a personalized cover letter for ${fullName} applying for the role of ${jobTitle} at ${companyName}.
    Highlight relevant skills: ${skills.join(", ")} 
    and experience: ${experience.map((exp) => `${exp.role} at ${exp.company}`).join(", ")}.
    Keep it formal, professional, and 3-4 short paragraphs.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const coverLetter = result.response.text();

    res.json({ coverLetter });
  } catch (error) {
    console.error("AI Cover Letter Error:", error.message);
    res.status(500).json({ message: "Failed to generate cover letter" });
  }
};

// AI ATS Score Prediction
export const atsScore = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
    You are an ATS (Applicant Tracking System). 
    Compare the following resume with the job description.
    Resume: ${resumeText}
    Job Description: ${jobDescription}
    
    1. Score the match (0-100).
    2. List key strengths.
    3. List weaknesses and missing keywords.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    res.json({ atsAnalysis: analysis });
  } catch (error) {
    console.error("ATS Score Error:", error.message);
    res.status(500).json({ message: "Failed to generate ATS score" });
  }
};

// AI Resume Analytics
export const resumeAnalytics = async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `
    Analyze the following resume text:
    ${resumeText}

    Provide:
    - Strengths (bullet points)
    - Weaknesses (bullet points)
    - Suggestions to improve
    Format output in structured markdown.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const analytics = result.response.text();

    res.json({ analytics });
  } catch (error) {
    console.error("Resume Analytics Error:", error.message);
    res.status(500).json({ message: "Failed to analyze resume" });
  }
};
