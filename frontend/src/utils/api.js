// src/utils/api.js
const API_URL = import.meta.env.VITE_API_URL; // base URL from .env

// Helper function for API calls
const request = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}/api${endpoint}`, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};

// ------------------------- AUTH -------------------------
export const registerUser = (userData) =>
  request("/auth/register", "POST", userData);

export const loginUser = (userData) =>
  request("/auth/login", "POST", userData);

// ------------------------- RESUMES -------------------------
export const createResume = (resumeData, token) =>
  request("/resume", "POST", resumeData, token);

export const getResumes = (token) =>
  request("/resume", "GET", null, token);

export const getResumeById = (id, token) =>
  request(`/resume/${id}`, "GET", null, token);

export const updateResume = (id, resumeData, token) =>
  request(`/resume/${id}`, "PUT", resumeData, token);

export const deleteResume = (id, token) =>
  request(`/resume/${id}`, "DELETE", null, token);

// ------------------------- AI -------------------------
export const generateSummary = (resumeData, token) =>
  request("/ai/summary", "POST", resumeData, token);

export const generateCoverLetter = (resumeData, token) =>
  request("/ai/cover-letter", "POST", resumeData, token);

export const generateATSScore = (resumeData, token) =>
  request("/ai/ats-score", "POST", resumeData, token);

export const generateAnalytics = (resumeData, token) =>
  request("/ai/analytics", "POST", resumeData, token);
