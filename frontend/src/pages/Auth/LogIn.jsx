import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig"; // Import the configured axios instance
import { useJobContext } from "../../store/JobContext";
import { toast } from "react-toastify"; // Import toast

const LogIn = () => {
  const { setIsLoggedIn, setUserRole } = useJobContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State for loading

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await axiosInstance.post("/users/login", formData);
      const { success, msg, user, token } = res.data; // Assuming user object contains username, email, and user ID
      console.log("msg : ", msg);
      console.log("user " , user);
      console.log("token :" , token);

      if (success) {
        // Store token and user info in local storage
        localStorage.setItem('authToken', token); // Store the token
        localStorage.setItem('username', user.username); // Store username
        localStorage.setItem('email', user.email); // Store email
        localStorage.setItem('userId', user.userid); // Store user ID
        localStorage.setItem("role", user.role)

        setIsLoggedIn(true);
        setUserRole(user.role);
        toast.success(msg); // Success message
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again."); // General error message
    } finally {
      setLoading(false); // End loading
    }

    // Clear form data
    setFormData({
      email: "",
      password: "",
    });
  };

  // Handle Enter key press
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e); // Pass the event to handleSubmit
    }
  };

  // Update form data based on input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa", // Solid background color
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          border: "none",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#007bff" }}>
          Login
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3 position-relative">
            <FaUser
              className="position-absolute"
              style={{
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#007bff",
              }}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleOnKeyPress} // Handle Enter key press
              style={{
                paddingLeft: "40px",
                width: "100%",
                padding: "10px 30px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "1px solid #ced4da",
                outline: "none",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
              }}
              aria-label="Email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 position-relative">
            <FaLock
              className="position-absolute"
              style={{
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#007bff",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleOnKeyPress} // Handle Enter key press
              style={{
                paddingLeft: "40px",
                width: "100%",
                padding: "10px 30px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "1px solid #ced4da",
                outline: "none",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
              }}
              aria-label="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              padding: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Additional Links */}
        <div className="d-flex justify-content-between mt-3">
          <a
            href="/forgot-password"
            style={{ fontSize: "0.9rem", color: "#007bff" }}
          >
            Forgot Password?
          </a>
          <Link to="/signup" style={{ fontSize: "0.9rem", color: "#007bff" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
