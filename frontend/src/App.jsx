// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadResume from "./pages/UploadResume";

function App() {
  return (
    <Router>
      {/* Added dark mode classes */}
      <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-resume"
              element={
                <ProtectedRoute>
                  <UploadResume />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
