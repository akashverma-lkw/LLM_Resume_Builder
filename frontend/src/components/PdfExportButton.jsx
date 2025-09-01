// src/components/PdfExportButton.jsx
import html2pdf from "html2pdf.js";

function PdfExportButton({ resume }) {
  const handleExport = () => {
    const element = document.getElementById("resume-preview");

    const options = {
      margin: 0.5,
      filename: `${resume.fullName.replace(/\s+/g, "_")}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <button
      onClick={handleExport}
      className="mt-4 mb-12 px-4 py-2 bg-red-600 text-white rounded 
                 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 
                 transition-colors duration-300 shadow" 
    >
      ⬇️ Download as PDF
    </button>
  );
}

export default PdfExportButton;
