// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLink = (path, label) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={path}
        className={`px-2 sm:px-3 py-1 rounded transition-colors text-sm sm:text-base ${
          location.pathname === path
            ? "text-yellow-600 dark:text-yellow-400 font-semibold"
            : "text-gray-700 dark:text-gray-200 hover:text-yellow-700 dark:hover:text-yellow-400"
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow px-4 sm:px-6 py-3 flex justify-between items-center transition-colors duration-300">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl sm:text-2xl font-bold text-yellow-700 dark:text-yellow-400 tracking-wide"
      >
        Resume<span className="text-gray-900 dark:text-gray-200">AI</span>
      </Link>

      {/* Right Side Nav */}
      <div className="flex items-center gap-3 sm:gap-6">
        {token ? (
          <>
            {navLink("/dashboard", "Dashboard")}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-3 sm:px-4 py-1 rounded bg-red-500 text-white text-sm sm:text-base hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 transition"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            {navLink("/login", "Login")}
            {navLink("/register", "Register")}
          </>
        )}

        {/* Dark Mode Toggle */}
        <motion.button
          whileTap={{ rotate: 180, scale: 0.9 }}
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </motion.button>
      </div>
    </nav>
  );
}

export default Navbar;
