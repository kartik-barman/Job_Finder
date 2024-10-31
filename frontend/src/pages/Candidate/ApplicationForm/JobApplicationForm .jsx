import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../components/NavBar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobApplicationForm = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const applicantId = localStorage.getItem("userId");

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const res = await axios.get(
          `https://job-finder-one.vercel.app/api/jobs/${id}`
        );
        const result = res.data;
        setJob(result.job);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getJobDetails();
  }, [id]);

  console.log(job);

  const [formData, setFormData] = useState({
    applicantName: "",
    fatherMotherName: "",
    email: "",
    phone: "",
    collegeName: "",
    degree: "",
    address: "",
    resume: null, // Keep resume in state but won't send it
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
      resume: e.target.files[0], // Store the resume in state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      jobId: id,
      applicantId: applicantId,
      applicantName: formData.applicantName,
      fatherMotherName: formData.fatherMotherName,
      email: formData.email,
      phone: formData.phone,
      collegeName: formData.collegeName,
      degree: formData.degree,
      address: formData.address,
      jobTitle: job.title,
      company: job.company,
    };

    try {
      const response = await axios.post(
        "https://job-finder-one.vercel.app/api/job/application/post-job",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
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
        resume: null, // Reset resume state
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
          height: "72px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px 0 rgba(0,0,0,.15)",
          marginBottom: "2px",
        }}
      >
        <NavBar />
      </div>
      {/* Job Application Form */}
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
                }}
              />
            </div>
          </div>

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
                }}
              />
            </div>
          </div>

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
                height: "100px",
              }}
            />
          </div>

          <h4>Resume</h4>
          <div className="mb-3">
            <label htmlFor="resume" className="form-label">
              Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleResumeChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#6a11cb",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Submit Application
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobApplicationForm;
