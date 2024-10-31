import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import axios from "axios";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [applications, setApplications] = useState([]); // State for applications
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await axios.get(
          `https://job-finder-one.vercel.app/api/job/application/candidate/application/${userId}`
        );
        const result = res.data;
        console.log("API Response: ", result);
        if (result.success) {
          setApplications(result.application); // Set applications to the response array
        } else {
          setError(result.msg); // Set error to the response message
        }
      } catch (error) {
        console.error("Error fetching applications: ", error);
        setError(
          error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : "Failed to load applications. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, [userId]);

  const userData = {
    name: username,
    email: email,
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <NavBar />
      <div className="container mt-4">
        {/* User Details Section */}
        <div
          className="card mb-4"
          style={{
            borderRadius: "15px",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <div className="card-body">
            <h4 className="mb-4">User Details</h4>
            <p>
              <FaUser className="me-2" /> <strong>{userData.name}</strong>
            </p>
            <p>
              <FaEnvelope className="me-2" /> {userData.email}
            </p>
          </div>
        </div>

        {/* Job Applications Section */}
        <h4 className="mb-4">Job Applications</h4>
        {loading ? (
          <p>Loading applications...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : applications.length === 0 ? (
          <div className="alert alert-info">No applications found.</div>
        ) : (
          <div className="row">
            {applications.map((application) => (
              <div key={application._id} className="col-md-4 mb-4">
                <div
                  className="card"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{application.jobTitle}</h5>
                    <p className="card-text">
                      <strong>Company:</strong> {application.company}
                    </p>
                    <p className="card-text">
                      <FaCalendarAlt className="me-2" />{" "}
                      <strong>Applied on:</strong>{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                    <p
                      className={`badge ${
                        application.applicationStatus === "applied"
                          ? "bg-success"
                          : application.applicationStatus === "rejected"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {application.applicationStatus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
