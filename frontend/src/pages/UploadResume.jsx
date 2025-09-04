// src/components/UploadResume.jsx
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { Upload, FileText, FileSignature, BarChart3, BadgeCheck } from "lucide-react";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [atsScore, setAtsScore] = useState(null);
  const [aiOutput, setAiOutput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedResume, setUploadedResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeDetails, setResumeDetails] = useState(null);

  const token = localStorage.getItem("token");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Load from localStorage
  useEffect(() => {
    const savedResume = localStorage.getItem("uploadedResume");
    if (savedResume) {
      const parsed = JSON.parse(savedResume);
      setUploadedResume(parsed);
      setAtsScore(parsed.atsScore || null);
    }
  }, []);

  // Upload handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please upload a PDF resume.");

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resume/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      if (!data.extractedText) throw new Error("Resume text extraction failed. Please try again.");

      setAtsScore(data.atsScore || null);
      setUploadedResume(data);
      localStorage.setItem("uploadedResume", JSON.stringify(data));
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // AI requests
  const handleAIRequest = async (type) => {
    if (!uploadedResume?.extractedText) return setError("Upload a resume first.");

    setAiLoading(true);
    setError("");
    setAiOutput("");

    try {
      let prompt = "";

      if (type === "summary") {
        prompt = `Write a concise professional summary for this resume:\n\n${uploadedResume.extractedText}`;
      } else if (type === "cover") {
        prompt = `Write a tailored cover letter for Software Engineer at Tech Company using this resume:\n\n${uploadedResume.extractedText}`;
      } else if (type === "analytics") {
        prompt = `Extract details and analyze strengths, weaknesses, and keyword optimization:\n\n${uploadedResume.extractedText}`;
      } else if (type === "ats") {
        if (!jobDescription.trim()) {
          setError("Please paste a job description first.");
          setAiLoading(false);
          return;
        }
        prompt = `Compare this resume with the job description and return ATS score (0-100).\n\nResume:\n${uploadedResume.extractedText}\n\nJob Description:\n${jobDescription}`;
      }

      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      if (type === "ats") {
        const match = text.match(/\d+/);
        if (match) {
          setAtsScore(match[0]);
          setAiOutput(`ATS Score: ${match[0]} / 100`);
          const updatedResume = { ...uploadedResume, atsScore: match[0] };
          setUploadedResume(updatedResume);
          localStorage.setItem("uploadedResume", JSON.stringify(updatedResume));
        } else {
          setAtsScore("N/A");
          setAiOutput("ATS Score could not be determined.");
        }
      } else {
        setAiOutput(text);
      }
    } catch (err) {
      setAiOutput("Error: " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Reset handler
  const handleReset = () => {
    setAiOutput("");
    setAtsScore(null);
    setResumeDetails(null);
    setUploadedResume(null);
    setFile(null);
    setJobDescription("");
    localStorage.removeItem("uploadedResume");
    setFileInputKey(Date.now()); // 🔥 forces file input reset
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700 dark:text-yellow-400">
        📂 Upload Resume & AI Tools
      </h2>

      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

      {/* Upload Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 dark:hover:border-yellow-400 transition">
          <Upload className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {file ? file.name : "Drag & drop or click to upload PDF"}
          </p>
          <input
            key={fileInputKey}
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition"
        >
          {uploading ? "⏳ Uploading..." : "Upload & Analyze"}
        </button>
      </form>

      {/* AI Tools */}
      {uploadedResume?.extractedText && (
        <div className="mt-6 space-y-4">
          <h3 className="text-center text-lg font-semibold">AI Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AIButton
              icon={<FileText className="w-5 h-5" />}
              label="Summary"
              color="bg-yellow-600 hover:bg-yellow-700"
              onClick={() => handleAIRequest("summary")}
            />
            <AIButton
              icon={<FileSignature className="w-5 h-5" />}
              label="Cover Letter"
              color="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleAIRequest("cover")}
            />
            <AIButton
              icon={<BarChart3 className="w-5 h-5" />}
              label="Analytics"
              color="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleAIRequest("analytics")}
            />
            <AIButton
              icon={<BadgeCheck className="w-5 h-5" />}
              label="ATS Score"
              color="bg-green-600 hover:bg-green-700"
              onClick={() => handleAIRequest("ats")}
            />
          </div>

          {/* Job Description input for ATS */}
          <textarea
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 text-sm"
            rows="3"
          />

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full mt-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Reset
          </button>

          {/* ATS Score */}
          {atsScore !== null && (
            <div className="mt-3">
              <h4 className="font-semibold">ATS Score</h4>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-1">
                <div
                  className={`h-4 rounded-full ${
                    atsScore >= 70
                      ? "bg-green-500"
                      : atsScore >= 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{atsScore}% Match</p>
            </div>
          )}

          {/* AI Output */}
          {aiLoading ? (
            <div className="flex justify-center py-6">
              <div className="w-6 h-6 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            aiOutput && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 mt-4"
              >
                <h4 className="font-semibold mb-2">📄 AI Output</h4>
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{aiOutput}</ReactMarkdown>
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </motion.div>
  );
}

/* --- Reusable Button --- */
function AIButton({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium shadow transition ${color}`}
    >
      {icon} {label}
    </button>
  );
}

export default UploadResume;
