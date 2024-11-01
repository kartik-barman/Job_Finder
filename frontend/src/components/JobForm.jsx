import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const JobForm = () => {
  const userId = localStorage.getItem("userId");
  console.log("Employer id :", userId);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: [],
    salary: {
      min: "",
      max: "",
      currency: "INR",
    },
    type: "full-time",
    employer: userId,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "https://job-finder-one.vercel.app/api/jobs/create-job",
        formData
      );
      console.log(res.data);
      toast.success("Job posted successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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

  // Update nested salary field
  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      salary: {
        ...prevData.salary,
        [name]: value,
      },
    }));
  };

  // Handle adding requirements
  const addRequirement = () => {
    if (requirement.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        requirements: [...prevData.requirements, requirement],
      }));
      setRequirement("");
    } else {
      toast.error("Please enter a requirement");
    }
  };
  // Requirement input field state
  const [requirement, setRequirement] = useState("");
  // Remove a requirement
  const removeRequirement = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      requirements: prevData.requirements.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
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
        <div className=" d-flex justify-content-center align-items-center">
          <div
            className="card shadow p-4"
            style={{
              maxWidth: "1000px",
              width: "100%",
              borderRadius: "15px",
              border: "none",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <h3 className="text-center mb-4" style={{ color: "#007bff" }}>
              Post a New Job
            </h3>
            <form onSubmit={handleSubmit}>
              {/* Title Field */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label style={{ fontWeight: "bold" }}>Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #ced4da",
                      outline: "none",
                    }}
                  />
                </div>
                {/* Company Field */}
                <div className="col-md-4 mb-3">
                  <label style={{ fontWeight: "bold" }}>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #ced4da",
                      outline: "none",
                    }}
                  />
                </div>
                {/* Location Field */}
                <div className="col-md-4 mb-3">
                  <label style={{ fontWeight: "bold" }}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #ced4da",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className="mb-3">
                <label style={{ fontWeight: "bold" }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter job description"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    outline: "none",
                  }}
                  rows="4"
                />
              </div>
              <div className="row">
                <div className="col md-6">
                  {/* Requirements Field */}
                  <div className="mb-3">
                    <label style={{ fontWeight: "bold" }}>Requirements</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        placeholder="Enter a requirement"
                        style={{
                          width: "80%",
                          padding: "10px",
                          fontSize: "1rem",
                          borderRadius: "5px",
                          border: "1px solid #ced4da",
                          outline: "none",
                          marginRight: "10px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={addRequirement}
                        className="btn btn-secondary"
                        style={{
                          width: "20%",
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {/* Display Added Requirements */}
                    <ul className="mt-3">
                      {formData.requirements.map((req, index) => (
                        <li key={index} className="d-flex align-items-center">
                          <span style={{ flex: 1 }}>{req}</span>
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="btn btn-link text-danger"
                            style={{ fontSize: "0.9rem" }}
                          >
                            <FaTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col md-6">
                  {/* Job Type Field */}
                  <div className="mb-3">
                    <label style={{ fontWeight: "bold" }}>Job Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "1rem",
                        borderRadius: "5px",
                        border: "1px solid #ced4da",
                        outline: "none",
                      }}
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary Fields */}
              <div className="mb-3">
                <label style={{ fontWeight: "bold" }}>Salary Range (INR)</label>
                <div className="d-flex">
                  <input
                    type="number"
                    name="min"
                    value={formData.salary.min}
                    onChange={handleSalaryChange}
                    placeholder="Min"
                    style={{
                      width: "50%",
                      padding: "10px",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #ced4da",
                      outline: "none",
                      marginRight: "10px",
                    }}
                  />
                  <input
                    type="number"
                    name="max"
                    value={formData.salary.max}
                    onChange={handleSalaryChange}
                    placeholder="Max"
                    style={{
                      width: "50%",
                      padding: "10px",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #ced4da",
                      outline: "none",
                    }}
                  />
                </div>
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
              >
                Post Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobForm;
