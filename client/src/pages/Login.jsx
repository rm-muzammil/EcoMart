import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetail";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message || "Login successful!");
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      const userDetails = await fetchUserDetails();
      console.log(userDetails.data);

      dispatch(setUserDetails(userDetails.data));
      navigate("/");

      setFormData({ email: "", password: "" });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error(error.message);
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
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

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
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <p className=" text-right text-sm text-gray-600">
          <Link
            to={"/forgot-password"}
            className="text-green-600 hover:underline"
          >
            Forgot Password
          </Link>
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Switch to Register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
