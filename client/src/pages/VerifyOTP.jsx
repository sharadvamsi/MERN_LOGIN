import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { verifyOTP } from "../services/authAPI";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // Email passed from login page
  const receivedOtp = location.state?.otp; // OTP from backend response

  // Showing OTP in a toast message when the component loads
  useEffect(() => {
    if (receivedOtp) {
      toast.info(`Your OTP is: ${receivedOtp}`, {
        autoClose: false, // Keeps the toast open until dismissed
      });
    }
  }, [receivedOtp]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await verifyOTP(email, otp); // API call to verify OTP
      toast.success(data.message || "OTP verified successfully!"); // Displaying success toast
      navigate("/profile", { state: data.user }); // Redirecting to Profile page with user data
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP."); // Displaying error toast
    }
  };

  return (
    <div className="login-container">
<div className="otp-container">
      <form onSubmit={handleSubmit} className="otp-form">
        <ToastContainer />
        <h2 className="otp-head">Verify OTP</h2>
        <div className="form-group">
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>
        <button type="submit" className="verify-btn">
          Verify OTP
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default VerifyOTP;
