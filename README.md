📝 LLM Resume Builder
An AI-powered Resume Builder that helps users generate professional resumes, AI summaries, ATS scores, and cover letters using Gemini AI. Built with MERN stack (MongoDB, Express.js, React.js, Node.js) + Tailwind CSS.

🚀 Features
🔑 User Authentication (JWT-based login & signup)
📄 Resume Builder (create, edit, save resumes)
🤖 AI-Powered Assistance:
Generate Resume Summary
Create Cover Letter
Get ATS Score
Get Analytics/Feedback
🎨 Responsive UI with Tailwind CSS
🌍 Deployment Ready (Backend + Frontend)

🏗️ Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js, MongoDB
Database: MongoDB Atlas
Authentication: JWT (JSON Web Token)
AI API: Google Gemini API

📂 Project Structure
llm-resume-builder/
│── backend/        # Node.js + Express.js server
│   ├── config/     # DB, nodemailer, etc.
│   ├── controllers/ 
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
│── frontend/       # React.js + Tailwind CSS
│   ├── public/
│   ├── src/
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── package.json


⚙️ Setup Instructions

🔹 Backend Setup
cd backend
npm install

Create a .env file inside backend/:
PORT=5050
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173

Run backend server:
npm start

🔹 Frontend Setup
cd frontend
npm install

Create a .env file inside frontend/:
VITE_API_URL=http://localhost:5050

Run frontend:
npm run dev

🚀 Deployment
Backend: Render / Railway / Heroku
Frontend: Vercel / Netlify
Make sure to update FRONTEND_URL and API URLs in .env files.

👨‍💻 Author
Akash Verma
📧 akashvermastp7@gmail.com


