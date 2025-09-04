// src/components/ResumePreview.jsx
import { motion } from "framer-motion";
import { FileText, GraduationCap, Briefcase, Wrench, Folder } from "lucide-react";
import PdfExportButton from "./PdfExportButton";

function ResumePreview({ resume }) {
  if (!resume) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400 border rounded-xl">
        No resume selected.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      {/* Resume Content */}
      <motion.div
        id="resume-preview"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center border-b pb-4 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
            {resume.fullName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            {resume.email} {resume.phone && `| ${resume.phone}`}
          </p>
        </div>

        {/* Summary */}
        {resume.summary && (
          <Section title="Summary" icon={<FileText className="w-5 h-5" />}>
            <p className="text-gray-800 dark:text-gray-300">{resume.summary}</p>
          </Section>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <Section title="Education" icon={<GraduationCap className="w-5 h-5" />}>
            <ul className="list-disc list-inside space-y-1">
              {resume.education.map((edu, idx) => (
                <li key={idx} className="text-gray-800 dark:text-gray-300">
                  <span className="font-semibold">{edu.degree}</span> – {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <Section title="Experience" icon={<Briefcase className="w-5 h-5" />}>
            <ul className="space-y-3">
              {resume.experience.map((exp, idx) => (
                <li key={idx}>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {exp.role} @ {exp.company} <span className="text-sm text-gray-600 dark:text-gray-400">({exp.duration})</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 text-sm">{exp.description}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <Section title="Skills" icon={<Wrench className="w-5 h-5" />}>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <Section title="Projects" icon={<Folder className="w-5 h-5" />}>
            <ul className="space-y-3">
              {resume.projects.map((proj, idx) => (
                <li key={idx}>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {proj.title}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        [View]
                      </a>
                    )}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 text-sm">{proj.description}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </motion.div>

      {/* PDF Export Button */}
      <div className="mt-6 flex justify-center">
        <PdfExportButton resume={resume} />
      </div>
    </div>
  );
}

/* --- Reusable Section Component --- */
function Section({ title, icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <h2 className="flex items-center gap-2 text-xl font-semibold border-b pb-1 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        {icon} {title}
      </h2>
      {children}
    </motion.div>
  );
}

export default ResumePreview;
