// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center transition-colors duration-300">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 transition-colors"
      >
        ResumeAI
      </Link>

      {/* Right Side Nav */}
      <div className="flex items-center gap-6">
        {token ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-200 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-200 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 dark:text-gray-200 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors"
            >
              Register
            </Link>
          </>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
         {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
