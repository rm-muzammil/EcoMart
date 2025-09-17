import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { data, Link, useLocation, useNavigate } from "react-router-dom";

function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  });

  // Handle input change for each OTP box
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join(""); // combine into string like "123456"
    if (otpCode.length < 6) {
      return toast.error("Please enter all 6 digits");
    }

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:8080/api/user/verify-forgot-password-otp",
        { otp: otpCode, email: location?.state?.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message || "OTP verified successfully!");
      navigate("/reset-password", {
        state: {
          data: res.data,
          email: location?.state?.email,
        },
      });
      setOtp(["", "", "", "", "", ""]);

      // Redirect to reset password page (or dashboard)
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid OTP");
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
        className="bg-white p-6 shadow-md rounded-xl w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Enter OTP</h2>

        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-12 border text-center text-lg rounded-lg focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Switch to Register */}
        <p className="mt-4 text-sm text-gray-600">
          Didn’t receive OTP?{" "}
          <Link to="/resend-otp" className="text-green-600 hover:underline">
            Resend OTP
          </Link>
        </p>
      </form>
    </div>
  );
}

export default OtpVerification;
