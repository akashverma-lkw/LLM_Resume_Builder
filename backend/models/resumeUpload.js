import mongoose from "mongoose";

const resumeUploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: { type: String, required: true },
    extractedText: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ResumeUpload", resumeUploadSchema);
