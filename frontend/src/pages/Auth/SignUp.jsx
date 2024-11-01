import axios from "axios";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa"; // Added FaPhone icon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      toast.info("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://job-finder-one.vercel.app/api/users/create",
        formData
      );
      const { success, msg } = res.data;
      if (success) {
        toast.success(msg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      setFormData({
        username: "",
        email: "",
        mobile: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />

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
            Sign Up
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <FaUser className="position-absolute" style={iconStyle} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <FaEnvelope className="position-absolute" style={iconStyle} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Mobile Field with Phone Icon */}
            <div className="mb-3 position-relative">
              <FaPhone className="position-absolute" style={iconStyle} />
              <input
                type="number"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="mb-4 position-relative">
              <FaLock className="position-absolute" style={iconStyle} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="mb-4">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="" disabled>
                  Select User Role
                </option>
                <option value="candidate">Candidate</option>
                <option value="employer">Employer</option>
              </select>
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
            >
              {loading ? (
                <span className="badge bg-primary">
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

// Styles
const iconStyle = {
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  color: "#007bff",
};

const inputStyle = {
  paddingLeft: "40px",
  width: "100%",
  padding: "10px 30px",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "1px solid #ced4da",
  outline: "none",
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
};
