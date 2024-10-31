import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaBriefcase, FaCalendarAlt, FaMedal,
  FaCamera
} from 'react-icons/fa';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

const Profile = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const [userData] = useState({
    name: username,
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    email: email,
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/150/150",
    bio: "Passionate software engineer with 8+ years of experience in full-stack development. Specialized in React, Node.js, and cloud architecture.",
    applications: [
      {
        jobTitle: "Frontend Developer",
        companyName: "TechCorp Solutions",
        applyDate: "2024-10-15",
        status: "Interview Scheduled"
      },
      {
        jobTitle: "Backend Engineer",
        companyName: "Innovative Solutions",
        applyDate: "2024-10-20",
        status: "Pending"
      },
      {
        jobTitle: "Full Stack Developer",
        companyName: "Global Tech",
        applyDate: "2024-10-25",
        status: "Rejected"
      }
    ]
  });

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <NavBar />
      <div className="container mt-4">
        {/* User Details Section */}
        <div className="card mb-4" style={{ borderRadius: '15px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
          <div className="card-body">
            <h4 className="mb-4">User Details</h4>
            <p><FaUser className="me-2" /> <strong>{userData.name}</strong></p>
            <p><FaEnvelope className="me-2" /> {userData.email}</p>
            {/* <p><FaPhone className="me-2" /> {userData.phone}</p> */}
            <p>{userData.bio}</p>
          </div>
        </div>

        {/* Job Applications Section */}
        <h4 className="mb-4">Job Applications</h4>
        <div className="row">
          {userData.applications.map((application, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card" style={{ borderRadius: '15px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                  <h5 className="card-title">{application.jobTitle}</h5>
                  <p className="card-text"><strong>Company:</strong> {application.companyName}</p>
                  <p className="card-text"><FaCalendarAlt className="me-2" /> <strong>Applied on:</strong> {application.applyDate}</p>
                  <p className={`badge ${application.status === "Pending" ? 'bg-warning' : application.status === "Interview Scheduled" ? 'bg-info' : 'bg-danger'}`}>
                    {application.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
