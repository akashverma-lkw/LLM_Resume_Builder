import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedResume, setUploadedResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeDetails, setResumeDetails] = useState(null);

  const token = localStorage.getItem("token");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 🔹 Load saved resume from localStorage on mount
  useEffect(() => {
    const savedResume = localStorage.getItem("uploadedResume");
    if (savedResume) {
      const parsed = JSON.parse(savedResume);
      setUploadedResume(parsed);
      setAtsScore(parsed.atsScore || null);
    }
  }, []);

  // Handle resume upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please upload a PDF resume.");

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resume/upload`,
        {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      if (!data.extractedText) {
        throw new Error("Resume text extraction failed. Please try again.");
      }

      setAtsScore(data.atsScore || null);
      setUploadedResume(data);

      // 🔹 Save resume in localStorage
      localStorage.setItem("uploadedResume", JSON.stringify(data));

      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle AI requests
  const handleAIRequest = async (type) => {
    if (!uploadedResume?.extractedText) {
      return setError("Upload a resume first.");
    }

    setLoading(true);
    setError("");
    setAiOutput("");

    try {
      let prompt = "";

      if (type === "summary") {
        prompt = `Write a concise professional summary for the following resume:\n\n${uploadedResume.extractedText}`;
      } else if (type === "cover") {
        prompt = `Write a tailored professional cover letter for the role of Software Engineer at Tech Company using this resume:\n\n${uploadedResume.extractedText}`;
      } else if (type === "analytics") {
        prompt = `Extract candidate details (Name, Email, Skills, Experience) and provide resume analytics:
        - Strengths
        - Weaknesses
        - Keyword optimization
        - Suggestions for improvement
        
        Resume:\n\n${uploadedResume.extractedText}`;
      } else if (type === "ats") {
        if (!jobDescription.trim()) {
          setError("Please paste a job description first.");
          setLoading(false);
          return;
        }
        prompt = `Compare the following resume with this job description. 
        Return only a number (0-100) as the ATS score. 

        Resume:
        ${uploadedResume.extractedText}

        Job Description:
        ${jobDescription}`;
      }

      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      if (type === "ats") {
        const match = text.match(/\d+/);
        if (match) {
          setAtsScore(match[0]);
          setAiOutput(`ATS Score: ${match[0]} / 100`);

          // 🔹 Update stored resume with new ATS score
          const updatedResume = { ...uploadedResume, atsScore: match[0] };
          setUploadedResume(updatedResume);
          localStorage.setItem("uploadedResume", JSON.stringify(updatedResume));
        } else {
          setAtsScore("N/A");
          setAiOutput("ATS Score could not be determined.");
        }
      } else if (type === "analytics") {
        setAiOutput(text);

        // Rough extraction (AI text parsing can be improved)
        setResumeDetails({
          name: text.match(/Name:\s*(.*)/)?.[1] || "Not Found",
          email: text.match(/Email:\s*(.*)/)?.[1] || "Not Found",
          skills: text.match(/Skills:\s*(.*)/)?.[1] || "Not Found",
          experience: text.match(/Experience:\s*(.*)/)?.[1] || "Not Found",
        });
      } else {
        setAiOutput(text);
      }
    } catch (err) {
      setAiOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset everything
  const handleReset = () => {
    setAiOutput("");
    setAtsScore(null);
    setResumeDetails(null);
  };

  const handleResetATS = () =>{
    setAtsScore(null);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Upload Resume & AI Tools
      </h2>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          {loading ? "Uploading..." : "Upload & Get ATS Score"}
        </button>
      </form>

      {/* AI Features */}
      {uploadedResume?.extractedText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">AI Tools 🤖</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => handleAIRequest("summary")}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Generate Summary
            </button>
            <button
              onClick={() => handleAIRequest("cover")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Generate Cover Letter
            </button>
            <button
              onClick={() => handleAIRequest("analytics")}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Resume Analytics
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>

          {/* ✅ ATS Job Description Input */}
          <textarea
            placeholder="Paste Input Job Role..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2 border dark:bg-gray-800 rounded mb-3"
            rows="1"
          />
          <button
            onClick={() => handleAIRequest("ats")}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Generate ATS Score
          </button>

          {/* ATS Progress Bar */}
          {atsScore !== null && (
            <div className="mt-4">
              <h4 className="font-semibold">ATS Score</h4>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
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
              <p className="mt-1 text-sm text-gray-600">{atsScore}% Match</p>
            </div>
          )}

          {loading ? (
            <p className="text-gray-500">⏳ AI is processing...</p>
          ) : (
            aiOutput && (
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded shadow border border-gray-200 dark:border-gray-700 mt-4">
                <h4 className="font-semibold mb-2">AI Output:</h4>
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{aiOutput}</ReactMarkdown>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default UploadResume;
