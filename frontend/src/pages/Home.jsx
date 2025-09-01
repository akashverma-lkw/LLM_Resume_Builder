// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Rocket, Shield, Sparkles } from "lucide-react";

function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-yellow-500">B</span>uild <span className="text-yellow-500">Y</span>our <span className="text-yellow-500">R</span>esume with <span className="text-yellow-500">AI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create professional, ATS-friendly resumes in minutes. Get AI-powered
          summaries, cover letters, and analytics to land your dream job.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow transition"
          >
            Get Started
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-white transition"
          >
            Try Demo
          </Link>
          
        </div>
        <div className="mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">Want to check ATS Score ?</p>
          {/* Upload Resume Button */}
          <Link
            to="/upload-resume"
            className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            Upload Resume
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow hover:shadow-lg transition">
            <Rocket className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate resumes and cover letters in seconds with AI assistance.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow hover:shadow-lg transition">
            <Shield className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">ATS Friendly</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Optimized resumes to pass Applicant Tracking Systems effortlessly.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow hover:shadow-lg transition">
            <Sparkles className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get AI-driven analytics and personalized job recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 text-center">
          <div>
            <div className="text-4xl font-bold text-yellow-500">1</div>
            <h3 className="text-xl font-semibold my-2">Sign Up</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create your free account and access the dashboard.
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500">2</div>
            <h3 className="text-xl font-semibold my-2">Add Details</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your education, work experience, and skills.
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500">3</div>
            <h3 className="text-xl font-semibold my-2">Generate Resume</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Let AI craft a professional resume ready to download.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">AI Resume Builder</h3>
            <p className="text-sm">
              Helping job seekers create impactful resumes with AI-powered tools.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-yellow-500">Dashboard</Link></li>
              <li><Link to="/register" className="hover:text-yellow-500">Register</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-yellow-500">🌐</a>
              <a href="#" className="hover:text-yellow-500">🐦</a>
              <a href="#" className="hover:text-yellow-500">💼</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
