// src/components/PdfExportButton.jsx
import { useState } from "react";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";

function PdfExportButton({ resume }) {
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    setLoading(true);

    const options = {
      margin: 0.5,
      filename: `${resume.fullName?.replace(/\s+/g, "_") || "My"}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(options)
      .save()
      .finally(() => setLoading(false));
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleExport}
      disabled={loading}
      className={`mt-4 mb-12 flex items-center gap-2 px-5 py-2 rounded-lg shadow 
        text-white transition 
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Download PDF
        </>
      )}
    </motion.button>
  );
}

export default PdfExportButton;
