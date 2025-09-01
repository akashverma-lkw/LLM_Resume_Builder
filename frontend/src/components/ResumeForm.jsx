// src/components/ResumeForm.jsx
import { useState, useEffect } from "react";

function ResumeForm({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
    skills: [""],
    projects: [{ title: "", description: "", link: "" }],
  });

  // Handle input change for simple fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle dynamic array inputs
  const handleArrayChange = (index, field, value, key) => {
    const updated = [...formData[key]];
    updated[index][field] = value;
    setFormData({ ...formData, [key]: updated });
  };

  // Add new entry
  const handleAddField = (key, obj) => {
    setFormData({ ...formData, [key]: [...formData[key], obj] });
  };

  // Remove entry
  const handleRemoveField = (key, index) => {
    const updated = [...formData[key]];
    updated.splice(index, 1);
    setFormData({ ...formData, [key]: updated });
  };

  // Preload data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        education: initialData.education?.length
          ? initialData.education
          : [{ degree: "", institution: "", year: "" }],
        experience: initialData.experience?.length
          ? initialData.experience
          : [{ company: "", role: "", duration: "", description: "" }],
        skills: initialData.skills?.length ? initialData.skills : [""],
        projects: initialData.projects?.length
          ? initialData.projects
          : [{ title: "", description: "", link: "" }],
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow transition-colors duration-300"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {initialData ? "Edit Resume" : "Create Resume"}
      </h2>

      {/* Basic Info */}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-yellow-500"
        value={formData.phone}
        onChange={handleChange}
      />

      {/* Education */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Education</h3>
        {formData.education.map((edu, idx) => (
          <div key={idx} className="space-y-2 mb-2">
            <input
              type="text"
              placeholder="Degree"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange(idx, "degree", e.target.value, "education")
              }
            />
            <input
              type="text"
              placeholder="Institution"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={edu.institution}
              onChange={(e) =>
                handleArrayChange(idx, "institution", e.target.value, "education")
              }
            />
            <input
              type="text"
              placeholder="Year"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={edu.year}
              onChange={(e) =>
                handleArrayChange(idx, "year", e.target.value, "education")
              }
            />
            <button
              type="button"
              className="text-red-500 dark:text-red-400 text-sm"
              onClick={() => handleRemoveField("education", idx)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          onClick={() =>
            handleAddField("education", { degree: "", institution: "", year: "" })
          }
        >
          + Add Education
        </button>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Skills</h3>
        {formData.skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={skill}
              onChange={(e) => {
                const updated = [...formData.skills];
                updated[idx] = e.target.value;
                setFormData({ ...formData, skills: updated });
              }}
            />
            <button
              type="button"
              className="text-red-500 dark:text-red-400 text-sm"
              onClick={() => handleRemoveField("skills", idx)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          onClick={() => handleAddField("skills", "")}
        >
          + Add Skill
        </button>
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Experience</h3>
        {formData.experience.map((exp, idx) => (
          <div key={idx} className="space-y-2 mb-2">
            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={exp.company}
              onChange={(e) =>
                handleArrayChange(idx, "company", e.target.value, "experience")
              }
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={exp.role}
              onChange={(e) =>
                handleArrayChange(idx, "role", e.target.value, "experience")
              }
            />
            <input
              type="text"
              placeholder="Duration"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={exp.duration}
              onChange={(e) =>
                handleArrayChange(idx, "duration", e.target.value, "experience")
              }
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={exp.description}
              onChange={(e) =>
                handleArrayChange(idx, "description", e.target.value, "experience")
              }
            />
            <button
              type="button"
              className="text-red-500 dark:text-red-400 text-sm"
              onClick={() => handleRemoveField("experience", idx)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          onClick={() =>
            handleAddField("experience", {
              company: "",
              role: "",
              duration: "",
              description: "",
            })
          }
        >
          + Add Experience
        </button>
      </div>

      {/* Projects */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Projects</h3>
        {formData.projects.map((proj, idx) => (
          <div key={idx} className="space-y-2 mb-2">
            <input
              type="text"
              placeholder="Project Title"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={proj.title}
              onChange={(e) =>
                handleArrayChange(idx, "title", e.target.value, "projects")
              }
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={proj.description}
              onChange={(e) =>
                handleArrayChange(idx, "description", e.target.value, "projects")
              }
            />
            <input
              type="text"
              placeholder="Project Link"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
              value={proj.link}
              onChange={(e) =>
                handleArrayChange(idx, "link", e.target.value, "projects")
              }
            />
            <button
              type="button"
              className="text-red-500 dark:text-red-400 text-sm"
              onClick={() => handleRemoveField("projects", idx)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          onClick={() =>
            handleAddField("projects", { title: "", description: "", link: "" })
          }
        >
          + Add Project
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-400 transition"
        >
          {initialData ? "Update Resume" : "Save Resume"}
        </button>
      </div>
    </form>
  );
}

export default ResumeForm;
