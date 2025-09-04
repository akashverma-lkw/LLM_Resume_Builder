// src/components/AISection.jsx
import { useState } from "react";
import {
  generateSummary,
  generateCoverLetter,
  generateATSScore,
  generateAnalytics,
} from "../utils/api";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { FileText, FileSignature, BadgeCheck, BarChart3 } from "lucide-react";

function AISection({ resume }) {
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleAIRequest = async (type) => {
    setLoading(true);
    setAiOutput("");

    try {
      let response;

      if (type === "summary") {
        response = await generateSummary(resume, token);
        setAiOutput(response.summary);
      } else if (type === "cover") {
        response = await generateCoverLetter(
          {
            fullName: resume.fullName,
            skills: resume.skills,
            experience: resume.experience,
            jobTitle: "Software Engineer",
            companyName: "Tech Company",
          },
          token
        );
        setAiOutput(response.coverLetter);
      } else if (type === "ats") {
        response = await generateATSScore(
          {
            resumeText: JSON.stringify(resume),
            jobDescription:
              "Looking for a Software Engineer with React, Node.js, and AI experience.",
          },
          token
        );
        setAiOutput(response.atsAnalysis);
      } else if (type === "analytics") {
        response = await generateAnalytics(
          { resumeText: JSON.stringify(resume) },
          token
        );
        setAiOutput(response.analytics);
      }
    } catch (err) {
      setAiOutput("❌ Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-400 flex justify-center items-center gap-2">
        AI-Powered Tools
      </h2>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <AIButton
          icon={<FileText className="w-5 h-5" />}
          label="Generate Summary"
          color="bg-yellow-600 hover:bg-yellow-700 dark:hover:bg-yellow-500"
          onClick={() => handleAIRequest("summary")}
        />
        <AIButton
          icon={<FileSignature className="w-5 h-5" />}
          label="Generate Cover Letter"
          color="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500"
          onClick={() => handleAIRequest("cover")}
        />
        <AIButton
          icon={<BadgeCheck className="w-5 h-5" />}
          label="ATS Score"
          color="bg-green-600 hover:bg-green-700 dark:hover:bg-green-500"
          onClick={() => handleAIRequest("ats")}
        />
        <AIButton
          icon={<BarChart3 className="w-5 h-5" />}
          label="Resume Analytics"
          color="bg-purple-600 hover:bg-purple-700 dark:hover:bg-purple-500"
          onClick={() => handleAIRequest("analytics")}
        />
      </div>

      {/* AI Output */}
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        aiOutput && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              📄 AI Output
            </h3>
            <div className="prose dark:prose-invert max-w-none text-sm">
              <ReactMarkdown>{aiOutput}</ReactMarkdown>
            </div>
          </motion.div>
        )
      )}
    </motion.div>
  );
}

/* --- Reusable Button --- */
function AIButton({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium shadow-md transition ${color}`}
    >
      {icon} {label}
    </button>
  );
}

export default AISection;
