// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { Rocket, Shield, Sparkles, Linkedin, Twitter, Globe } from "lucide-react";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Build Your Resume
          </span>{" "}
          with AI Power ⚡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Create professional, ATS-friendly resumes in minutes. Get AI-powered
          summaries, cover letters, and analytics to land your dream job.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          <Link
            to="/register"
            className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition flex items-center gap-2"
          >
            🚀 Get Started
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-xl hover:bg-yellow-500 hover:text-white transition flex items-center gap-2"
          >
            🎯 Try Demo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12"
        >
          <p className="text-gray-500 dark:text-gray-300 mb-4">Want to check your Resume's ATS Score? <br /> <span className="text-red-400">Go to Dashboard</span></p>
          
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              icon: <Rocket className="w-12 h-12 text-yellow-500 mb-4" />,
              title: "Fast & Easy",
              desc: "Generate resumes and cover letters in seconds with AI assistance.",
            },
            {
              icon: <Shield className="w-12 h-12 text-yellow-500 mb-4" />,
              title: "ATS Friendly",
              desc: "Optimized resumes to pass Applicant Tracking Systems effortlessly.",
            },
            {
              icon: <Sparkles className="w-12 h-12 text-yellow-500 mb-4" />,
              title: "Smart Insights",
              desc: "Get AI-driven analytics and personalized job recommendations.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              {f.icon}
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 text-center">
          {[
            {
              step: "1",
              title: "Sign Up",
              desc: "Create your free account and access the dashboard.",
            },
            {
              step: "2",
              title: "Add Details",
              desc: "Enter your education, work experience, and skills.",
            },
            {
              step: "3",
              title: "Generate Resume",
              desc: "Let AI craft a professional resume ready to download.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="flex items-center justify-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500 text-white text-2xl font-bold shadow">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold my-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
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
              <a href="#" className="hover:text-yellow-500"><Globe /></a>
              <a href="#" className="hover:text-yellow-500"><Twitter /></a>
              <a href="#" className="hover:text-yellow-500"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
