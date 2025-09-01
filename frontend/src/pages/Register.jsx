// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/api";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser(formData);
      localStorage.setItem("token", res.token);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700 dark:text-yellow-400">
        Register
      </h2>

      {error && (
        <p className="text-red-500 dark:text-red-400 text-center mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 
            bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 
            bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold 
            hover:bg-yellow-700 dark:hover:bg-yellow-500 transition-colors duration-200"
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-yellow-600 dark:text-yellow-400 font-medium hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;
