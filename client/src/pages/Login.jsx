// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../services/authAPI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      toast.success("OTP sent successfully!");
      navigate("/verify-otp", { state: { email, otp: data.otp } });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/register"); // Navigate to the Register page when "Sign Up" is clicked
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <ToastContainer />
        <h2 className="login-head">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <a onClick={handleSignupRedirect}>Create account</a>
          
        </p>
      </form>
    </div>
  );
};

export default Login;
