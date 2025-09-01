import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],
    skills: [String],
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    summary: { type: String },
    
    fileUrl: {
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    required: true,
  },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
