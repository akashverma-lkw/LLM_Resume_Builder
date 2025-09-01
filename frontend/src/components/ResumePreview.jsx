// src/components/ResumePreview.jsx
import PdfExportButton from "./PdfExportButton";

function ResumePreview({ resume }) {
  if (!resume) {
    return <p className="text-gray-600 dark:text-gray-300">No resume selected.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg">
      {/* Exportable Resume */}
      <div
        id="resume-preview"
        className="border rounded p-6 mb-6 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
      >
        {/* Header */}
        <div className="text-center border-b pb-4 mb-4 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
            {resume.fullName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {resume.email} | {resume.phone}
          </p>
        </div>

        {/* Summary */}
        {resume.summary && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2 dark:border-gray-700 dark:text-gray-100">
              Summary
            </h2>
            <p className="text-gray-800 dark:text-gray-300">{resume.summary}</p>
          </div>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2 dark:border-gray-700 dark:text-gray-100">
              Education
            </h2>
            <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
              {resume.education.map((edu, idx) => (
                <li key={idx}>
                  <strong>{edu.degree}</strong> – {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2 dark:border-gray-700 dark:text-gray-100">
              Experience
            </h2>
            <ul className="space-y-3 dark:text-gray-300">
              {resume.experience.map((exp, idx) => (
                <li key={idx}>
                  <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
                  <p className="text-gray-700 dark:text-gray-400 text-sm">
                    {exp.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2 dark:border-gray-700 dark:text-gray-100">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2 dark:border-gray-700 dark:text-gray-100">
              Projects
            </h2>
            <ul className="space-y-3 dark:text-gray-300">
              {resume.projects.map((proj, idx) => (
                <li key={idx}>
                  <strong>{proj.title}</strong> – {proj.description}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      [Link]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* PDF Export Button */}
      <div className="flex justify-center"><PdfExportButton resume={resume} /></div>
      
    </div>
  );
}

export default ResumePreview;
