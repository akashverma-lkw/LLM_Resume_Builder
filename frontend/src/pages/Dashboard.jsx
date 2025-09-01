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
import { motion } from "framer-motion";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
    <div className="flex flex-col bg-white dark:bg-gray-900 shadow lg:flex-row gap-6 p-4 rounded-lg">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-1/4 bg-gray-50 dark:bg-gray-800 shadow p-4 rounded"
      >
        <h2 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">
          My Resumes
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
          }}
          className="w-full mb-4 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 dark:hover:bg-yellow-500 transition"
        >
          + New Resume
        </button>

        <ul className="space-y-2">
          {resumes.map((resume) => (
            <motion.li
              key={resume._id}
              whileHover={{ scale: 1.02 }}
              className={`p-3 border rounded cursor-pointer flex flex-col transition ${
                selectedResume?._id === resume._id
                  ? "bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
              }`}
              onClick={() => setSelectedResume(resume)}
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {resume.fullName}
              </span>
              <div className="flex gap-3 mt-2 text-sm">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowForm(true);
                    setEditMode(true);
                    setSelectedResume(resume);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteResume(resume._id);
                  }}
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-3/4 bg-white dark:bg-gray-800 shadow p-6 rounded"
      >
        {showForm ? (
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
        ) : selectedResume ? (
          <div className="space-y-6">
            <ResumePreview resume={selectedResume} />
            <AISection resume={selectedResume} />
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Select or create a resume to begin.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
