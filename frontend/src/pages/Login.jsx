// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/api";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-yellow-700 dark:text-yellow-400">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Login to your account
        </p>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 
              bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 
                bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 pr-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 text-white hover:bg-yellow-700 dark:hover:bg-yellow-500"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
