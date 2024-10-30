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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, userRole, setUserRole } = useJobContext();
  const navigate = useNavigate();

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
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  const handlePostJobClick = () => {
    if (!isLoggedIn) {
      toast.info("Please log in to post a job. Only Employer post a job");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      navigate("/post-job");
    }
  };

  return (
    <div className="" >
      <nav className="navbar navbar-expand-lg navbar-dark py-3">
        <div className="container">
          {/* Brand Logo Section */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <div className="d-flex justify-content-center align-items-center me-3 rounded-circle bg-success" 
                 style={{ 
                   width: "48px", 
                   height: "48px",
                   transition: "transform 0.2s",
                 }}>
              <FaSearch className="fs-4 text-white" />
            </div>
            <div>
              <h3 className="fs-4 fw-bold mb-0">JOB FINDER</h3>
              <p className="small text-light mb-0 opacity-75">Find your dream Job</p>
            </div>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <FaBars className="fs-4" />
          </button>

          {/* Navigation Links & Buttons */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {['Home', 'Browse Job', 'Pages', 'Blog', 'Contact'].map((item) => (
                <li key={item} className="nav-item px-2">
                  <Link
                    to={item === 'Home' ? '/' : `#${item.toLowerCase().replace(' ', '-')}`}
                    className="nav-link text-white fw-medium"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="d-flex gap-2 flex-wrap">
              {isLoggedIn ? (
                <>
                  {userRole === "employer" && (
                    <>
                      <Link
                        to="/employer/dashboard"
                        className="btn btn-primary d-flex align-items-center gap-2 px-3"
                      >
                        <FaUserTie />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={handlePostJobClick}
                        className="btn btn-success d-flex align-items-center gap-2 px-3"
                      >
                        <FaBriefcase />
                        <span>Add Post</span>
                      </button>
                    </>
                  )}
                  {userRole === "candidate" && (
                    <Link
                      to="/candidate/profile"
                      className="btn btn-info text-white d-flex align-items-center gap-2 px-3"
                    >
                      <FaUser />
                      <span>Profile</span>
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="btn btn-warning text-white d-flex align-items-center gap-2 px-3"
                    >
                      <FaTools />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogOut}
                    className="btn btn-danger d-flex align-items-center gap-2 px-3"
                  >
                    <FaSignOutAlt />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-light d-flex align-items-center gap-2 px-3"
                  >
                    <FaSignInAlt />
                    <span>Log In</span>
                  </Link>
                  <button
                    onClick={handlePostJobClick}
                    className="btn btn-success d-flex align-items-center gap-2 px-3"
                  >
                    <FaBriefcase />
                    <span>Post A Job</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default NavBar;