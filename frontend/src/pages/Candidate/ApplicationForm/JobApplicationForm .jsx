import React, { useState } from "react";
import axios from "axios";
import NavBar from "../../../components/NavBar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobApplicationForm = () => {
  const { id } = useParams();
  console.log("Job Id : ", id);
  const applicantId = localStorage.getItem("userId");
  console.log("Applicant Id : ", applicantId);
  const [formData, setFormData] = useState({
    applicantName: "",
    fatherMotherName: "",
    email: "",
    phone: "",
    collegeName: "",
    degree: "",
    address: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData instance to handle multipart form data
    const data = new FormData();
    data.append("jobId", id);
    data.append("applicantId", applicantId);
    data.append("applicantName", formData.applicantName);
    data.append("fatherMotherName", formData.fatherMotherName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("collegeName", formData.collegeName);
    data.append("degree", formData.degree);
    data.append("address", formData.address);
    data.append("resume", formData.resume);

    console.log(data);
    try {
      const response = await axios.post(
        "https://job-finder-one.vercel.app/api/job/application/post-job",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Application submitted successfully!");
      setFormData({
        applicantName: "",
        fatherMotherName: "",
        email: "",
        phone: "",
        collegeName: "",
        degree: "",
        address: "",
        resume: null,
      });
    } catch (error) {
      console.error("Error uploading application:", error);
      toast.error("Error submitting application, please try again.");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "1000",
          backgroundColor: "rgb(204 57 232)",
        }}
      >
        <NavBar />
      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          margin: "20px",
        }}
      >
        <h2 className="text-center mb-4">Job Application Form</h2>
        <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
          {/* Personal Information Section */}
          <h4>Personal Information</h4>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="applicantName" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                placeholder="Enter your name"
                value={formData.applicantName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="fatherMotherName" className="form-label">
                Father/Mother Name
              </label>
              <input
                type="text"
                id="fatherMotherName"
                name="fatherMotherName"
                placeholder="Enter your father or mother name"
                value={formData.fatherMotherName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your valid email id"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your valid phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
            </div>
          </div>

          {/* College Information Section */}
          <h4>College Information</h4>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="collegeName" className="form-label">
                College Name
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                placeholder="Enter your college name"
                value={formData.collegeName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="degree" className="form-label">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                placeholder="Enter your degree"
                value={formData.degree}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  boxShadow: "none",
                }}
              />
            </div>
          </div>

          {/* Address Section */}
          <h4>Address</h4>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
                boxShadow: "none",
                height: "100px",
              }}
            />
          </div>

          {/* Resume Upload Section */}
          <div className="mb-3">
            <label htmlFor="resume" className="form-label">
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf, .doc, .docx"
              onChange={handleResumeChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
                boxShadow: "none",
              }}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit Application
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobApplicationForm;
