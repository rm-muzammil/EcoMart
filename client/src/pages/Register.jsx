import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message || "Registration successful!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      // Handles server errors or network issues
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
        console.log(error);
      } else {
        toast.error(error.message);
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <label className="block text-sm font-medium text-gray-700">Email</label>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
        {/* Switch to Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
