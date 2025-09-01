// src/components/AISection.jsx
import { useState } from "react";
import {
  generateSummary,
  generateCoverLetter,
  generateATSScore,
  generateAnalytics,
} from "../utils/api";
import ReactMarkdown from "react-markdown";

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
      setAiOutput("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 shadow rounded transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">
        AI-Powered Tools 🤖
      </h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => handleAIRequest("summary")}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 dark:hover:bg-yellow-500"
        >
          Generate Summary
        </button>
        <button
          onClick={() => handleAIRequest("cover")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500"
        >
          Generate Cover Letter
        </button>
        <button
          onClick={() => handleAIRequest("ats")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:hover:bg-green-500"
        >
          ATS Score
        </button>
        <button
          onClick={() => handleAIRequest("analytics")}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 dark:hover:bg-purple-500"
        >
          Resume Analytics
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">⏳ AI is generating...</p>
      ) : (
        aiOutput && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              AI Output:
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{aiOutput}</ReactMarkdown>
            </div>
          </div>


        )
      )}
    </div>
  );
}

export default AISection;
