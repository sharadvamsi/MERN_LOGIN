import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import "react-toastify/dist/ReactToastify.css";
import './styles.css';
import VerifyOTP from './pages/VerifyOTP';
import Profile from './pages/Profile';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add other routes like Register, Thank You */}
      </Routes>
    </Router>
  );
};

export default App;