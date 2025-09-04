// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  getResumes,
  createResume,
  updateResume,
  deleteResume,
} from "../utils/api";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import AISection from "../components/AISection";
import UploadResume from "../pages/UploadResume";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FileText, Edit3, Trash2, Upload } from "lucide-react";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch resumes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResumes(token);
        setResumes(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [token]);

  const handleCreateResume = async (resumeData) => {
    try {
      const newResume = await createResume(resumeData, token);
      setResumes([...resumes, newResume]);
      setSelectedResume(newResume);
      setShowForm(false);
      setShowUpload(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdateResume = async (id, resumeData) => {
    try {
      const updated = await updateResume(id, resumeData, token);
      setResumes(resumes.map((r) => (r._id === id ? updated : r)));
      setSelectedResume(updated);
      setShowForm(false);
      setEditMode(false);
      setShowUpload(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await deleteResume(id, token);
      setResumes(resumes.filter((r) => r._id !== id));
      if (selectedResume?._id === id) setSelectedResume(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-1/4 bg-white dark:bg-gray-800 shadow-lg p-5 rounded-xl flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">
          My Resumes
        </h2>

        {/* Create + Upload buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setShowUpload(false);
              setSelectedResume(null);
            }}
            className="w-full flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 dark:hover:bg-yellow-500 transition"
          >
            <Plus className="w-4 h-4" /> New Resume
          </button>

          <button
            onClick={() => {
              setShowUpload(true);
              setShowForm(false);
              setEditMode(false);
              setSelectedResume(null);
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition"
          >
            <Upload className="w-4 h-4" /> Upload Resume
          </button>
        </div>

        {/* Resume list */}
        <ul className="space-y-2 mt-6 flex-1 overflow-y-auto custom-scrollbar">
          {resumes.length === 0 ? (
            <p className="text-gray-500 text-sm text-center mt-8">
              No resumes yet. Create or upload one!
            </p>
          ) : (
            resumes.map((resume) => (
              <motion.li
                key={resume._id}
                whileHover={{ scale: 1.02 }}
                className={`p-3 border rounded-lg cursor-pointer transition group ${
                  selectedResume?._id === resume._id
                    ? "bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-500"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                }`}
                onClick={() => {
                  setSelectedResume(resume);
                  setShowForm(false);
                  setShowUpload(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
                    {resume.fullName}
                  </span>
                </div>
                <div className="flex gap-3 mt-2 text-xs opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowForm(true);
                      setEditMode(true);
                      setSelectedResume(resume);
                      setShowUpload(false);
                    }}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteResume(resume._id);
                    }}
                    className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </motion.li>
            ))
          )}
        </ul>
      </motion.div>

      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-3/4 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl"
      >
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <ResumeForm
                initialData={editMode ? selectedResume : null}
                onSave={
                  editMode
                    ? (data) => handleUpdateResume(selectedResume._id, data)
                    : handleCreateResume
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditMode(false);
                }}
              />
            </motion.div>
          ) : showUpload ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
            >
              <UploadResume />
            </motion.div>
          ) : selectedResume ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <ResumePreview resume={selectedResume} />
              <AISection resume={selectedResume} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center h-full py-20 text-gray-500"
            >
              <FileText className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2">No resume selected</p>
              <p className="text-sm">
                Create, upload, or select a resume to get started.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Dashboard;
