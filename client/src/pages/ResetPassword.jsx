import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location?.state?.email || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:8080/api/user/reset-password",
        {
          email: formData.email,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message || "Password reset successful!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to reset password");
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
        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Your Password
        </h2>

        {/* Email (readonly) */}
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full mb-3 px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
        />

        {/* New Password */}
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
