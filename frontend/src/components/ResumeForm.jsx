// src/components/ResumeForm.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Wrench, FolderPlus } from "lucide-react";

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

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // Handle dynamic fields
  const handleArrayChange = (index, field, value, key) => {
    const updated = [...formData[key]];
    updated[index][field] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const handleAddField = (key, obj) => {
    setFormData({ ...formData, [key]: [...formData[key], obj] });
  };

  const handleRemoveField = (key, index) => {
    const updated = [...formData[key]];
    updated.splice(index, 1);
    setFormData({ ...formData, [key]: updated });
  };

  // Preload data
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

  // Validate form
  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (formData.phone && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      ...formData,
      extractedText: "",
      fileUrl: "",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {initialData ? "Edit Resume" : "Create Resume"}
      </h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input-field"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input-field"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      </div>

      {/* Education */}
      <SectionCard title="Education" icon={<GraduationCap className="w-5 h-5" />}>
        {formData.education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2 gap-3 mb-2"
          >
            <input
              type="text"
              placeholder="Degree"
              className="input-field"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange(idx, "degree", e.target.value, "education")
              }
            />
            <input
              type="text"
              placeholder="Institution"
              className="input-field"
              value={edu.institution}
              onChange={(e) =>
                handleArrayChange(idx, "institution", e.target.value, "education")
              }
            />
            <input
              type="text"
              placeholder="Year"
              className="input-field"
              value={edu.year}
              onChange={(e) =>
                handleArrayChange(idx, "year", e.target.value, "education")
              }
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveField("education", idx)}
            >
              ✕
            </button>
          </motion.div>
        ))}
        <AddButton onClick={() => handleAddField("education", { degree: "", institution: "", year: "" })} />
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Skills" icon={<Wrench className="w-5 h-5" />}>
        {formData.skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Skill"
              className="input-field"
              value={skill}
              onChange={(e) => {
                const updated = [...formData.skills];
                updated[idx] = e.target.value;
                setFormData({ ...formData, skills: updated });
              }}
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveField("skills", idx)}
            >
              ✕
            </button>
          </div>
        ))}
        <AddButton onClick={() => handleAddField("skills", "")} />
      </SectionCard>

      {/* Experience */}
      <SectionCard title="Experience" icon={<Briefcase className="w-5 h-5" />}>
        {formData.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2 mb-3"
          >
            <input
              type="text"
              placeholder="Company"
              className="input-field"
              value={exp.company}
              onChange={(e) =>
                handleArrayChange(idx, "company", e.target.value, "experience")
              }
            />
            <input
              type="text"
              placeholder="Role"
              className="input-field"
              value={exp.role}
              onChange={(e) =>
                handleArrayChange(idx, "role", e.target.value, "experience")
              }
            />
            <input
              type="text"
              placeholder="Duration"
              className="input-field"
              value={exp.duration}
              onChange={(e) =>
                handleArrayChange(idx, "duration", e.target.value, "experience")
              }
            />
            <textarea
              placeholder="Description"
              className="input-field"
              value={exp.description}
              onChange={(e) =>
                handleArrayChange(idx, "description", e.target.value, "experience")
              }
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveField("experience", idx)}
            >
              ✕
            </button>
          </motion.div>
        ))}
        <AddButton
          onClick={() =>
            handleAddField("experience", {
              company: "",
              role: "",
              duration: "",
              description: "",
            })
          }
        />
      </SectionCard>

      {/* Projects */}
      <SectionCard title="Projects" icon={<FolderPlus className="w-5 h-5" />}>
        {formData.projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 mb-3"
          >
            <input
              type="text"
              placeholder="Project Title"
              className="input-field"
              value={proj.title}
              onChange={(e) =>
                handleArrayChange(idx, "title", e.target.value, "projects")
              }
            />
            <textarea
              placeholder="Description"
              className="input-field"
              value={proj.description}
              onChange={(e) =>
                handleArrayChange(idx, "description", e.target.value, "projects")
              }
            />
            <input
              type="text"
              placeholder="Project Link"
              className="input-field"
              value={proj.link}
              onChange={(e) =>
                handleArrayChange(idx, "link", e.target.value, "projects")
              }
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveField("projects", idx)}
            >
              ✕
            </button>
          </motion.div>
        ))}
        <AddButton onClick={() => handleAddField("projects", { title: "", description: "", link: "" })} />
      </SectionCard>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialData ? "Update Resume" : "Save Resume"}
        </button>
      </div>
    </motion.form>
  );
}

/* --- Reusable Components --- */
function SectionCard({ title, icon, children }) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <h3 className="flex items-center gap-2 font-semibold mb-3 text-gray-900 dark:text-gray-100">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function AddButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 px-3 py-1 text-sm rounded bg-yellow-500 hover:bg-yellow-600 text-white transition"
    >
      + Add
    </button>
  );
}

export default ResumeForm;
