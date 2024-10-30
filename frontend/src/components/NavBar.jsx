import React, { useEffect } from "react";
import {
  FaSearch,
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserTie,
  FaUser,
  FaBriefcase,
  FaTools,
} from "react-icons/fa";
import { useJobContext } from "../store/JobContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole } = useJobContext();
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem("role"));
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [setIsLoggedIn, setUserRole]);

  const handleLogOut = () => {
    localStorage.clear(); // Clears all stored items on logout
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/"); // Redirect to the home page or login page
  };

  const handlePostJobClick = () => {
    if (!isLoggedIn) {
      toast.info("Please log in to post a job.Only Employer post a job"); // Show toast message
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page after 2 seconds
      }, 2000);
    } else {
      navigate("/post-job"); // Redirect to the post job page if logged in
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container">
          {/* Brand Logo Section */}
          <a href="/" className="navbar-brand d-flex align-items-center text-white">
            <div
              className="d-flex justify-content-center align-items-center me-2"
              style={{
                backgroundColor: "green",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
              }}
            >
              <FaSearch style={{ color: "white", fontSize: "30px" }} />
            </div>
            <div>
              <h3 className="m-0 p-0">JOB FINDER</h3>
              <p className="m-0 p-0">Find your dream Job</p>
            </div>
          </a>

          {/* Toggler button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars style={{ color: "white", fontSize: "24px" }} />
          </button>

          {/* Navbar Section */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#browse-job" className="nav-link text-white">
                  Browse Job
                </a>
              </li>
              <li className="nav-item">
                <a href="#pages" className="nav-link text-white">
                  Pages
                </a>
              </li>
              <li className="nav-item">
                <a href="#blog" className="nav-link text-white">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link text-white">
                  Contact
                </a>
              </li>
            </ul>

            {/* Buttons Section */}
            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  {/* Show buttons based on user roles */}
                  {userRole === "employer" && (
                    <>
                      <Link
                        to="/employer/dashboard"
                        className="btn btn-primary me-2 d-flex align-items-center text-white"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <FaUserTie className="me-1" />
                        Dashboard
                      </Link>
                      <button
                        className="btn btn-success me-2 d-flex align-items-center text-white"
                        style={{ fontSize: "0.9rem" }}
                        onClick={handlePostJobClick} // Use the new handler
                      >
                        <FaBriefcase className="me-1" />
                        Add Post
                      </button>
                    </>
                  )}
                  {userRole === "candidate" && (
                    <Link
                      to="/candidate/profile"
                      className="btn btn-outline-primary me-2 d-flex align-items-center text-white"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <FaUser className="me-1" />
                      Profile
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="btn btn-warning me-2 d-flex align-items-center text-white"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <FaTools className="me-1" />
                      Admin Panel
                    </Link>
                  )}
                  {/* Logout button visible to all logged-in users */}
                  <button
                    className="btn btn-danger d-flex align-items-center text-white"
                    style={{ fontSize: "0.9rem" }}
                    onClick={handleLogOut}
                  >
                    <FaSignOutAlt className="me-1" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary me-2 d-flex align-items-center text-white"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <FaSignInAlt className="me-1" />
                    Log In
                  </Link>
                  <button
                    className="btn btn-success d-flex align-items-center"
                    style={{ fontSize: "0.9rem" }}
                    onClick={handlePostJobClick} // Use the new handler
                  >
                    <FaBriefcase className="me-1" />
                    Post A Job
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer /> {/* Toast Container for notifications */}
    </>
  );
};

export default NavBar;
