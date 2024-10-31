import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig"; 
import { useJobContext } from "../../store/JobContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
  const { setIsLoggedIn, setUserRole } = useJobContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("https://job-finder-one.vercel.app/api/users/login", formData);
      const { success, msg, user, token } = res.data;

      if (success) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', user.userid);
        localStorage.setItem("role", user.role);

        setIsLoggedIn(true);
        setUserRole(user.role);
        toast.success(msg);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
       <ToastContainer
        position="top-center" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#f8f9fa" }}
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
                onKeyPress={handleOnKeyPress}
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
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleOnKeyPress}
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
    </>
  );
};

export default LogIn;
