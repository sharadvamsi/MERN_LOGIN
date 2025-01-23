import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state; // Getting user data passed from VerifyOTP page
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    if (user?.name) {
      toast.success(`Welcome, ${user.name}!`);
    }
  }, [user]);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/delete-account`, {
        email: user.email, // Passing the email to the delete-account endpoint
      });

      toast.success("Account deleted successfully.");
      navigate("/"); // Redirecting to login page
    } catch (error) {
      toast.error("Failed to delete account.");
    } finally {
      setIsDeleting(false); // Reset button state
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
<div className="profile-container">
      <div className="profile-card">
        <img src={user.imageUrl} alt="Profile" className="profile-pic" />
        <h2>{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Company Name:</strong> {user.companyName}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>DOB:</strong> {user.dob}
        </p>
        <button
          className="delete-btn"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default Profile;
