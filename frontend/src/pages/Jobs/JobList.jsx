import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useJobContext } from "../../store/JobContext";

// Add the relativeTime plugin to dayjs
dayjs.extend(relativeTime);

const JobList = () => {
  const { jobs, setJobs } = useJobContext(); // Destructure jobs and setJobs from context
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [error, setError] = useState(null); // State for error handling

  const fetchAllJobs = async () => {
    try {
      const res = await axios.get("https://job-finder-one.vercel.app/api/jobs/");
      const data = res.data;
      setJobs(data.jobs); // Set jobs in context
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.log("Error: ", err);
      setError("Failed to load jobs. Please try again later."); // Set error message
      setLoading(false); // Stop the loading spinner on error
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Function to format salary in Indian Rupees (INR)
  const formatSalaryInINR = (salary) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(salary);
  };

  return (
    <div className="" style={{ backgroundColor: "#f5f2f6" }}>
      <div className="container">
        {/* Main heading with underline */}
        <div className="text-center p-2 mb-4">
          <h2
            style={{
              fontWeight: "bold",
              position: "relative",
              display: "inline-block",
            }}
          >
            Popular Recommended Jobs
          </h2>
          <div
            style={{
              height: "3px",
              width: "50%",
              backgroundColor: "#00796b",
              margin: "0 auto",
              marginTop: "8px",
            }}
          ></div>
        </div>

        {/* Decorative content below the heading */}
        {/* <div className="text-center mb-4">
        <span
          className="d-inline-block px-3 py-1"
          style={{
            backgroundColor: "#e0f7fa",
            color: "#00796b",
            fontWeight: "bold",
            borderRadius: "20px",
            fontSize: "1.25rem",
          }}
        >
          Success is the most key smile
        </span>
      </div> */}

        {loading ? (
          // Show Bootstrap loading spinner while data is being fetched
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          // Show error message if data fails to load
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : (
          <div className="row">
            {jobs.map((job, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div
                  className="card h-100"
                  style={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text text-muted">{job.description}</p>
                    <p className="mb-1">
                      <strong>Company:</strong> {job.company}
                    </p>
                    <p className="mb-1">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="mb-1">
                      <strong>Type:</strong> {job.type}
                    </p>

                    {/* Format salary to Indian Rupees */}
                    <p className="mb-1">
                      <strong>Salary:</strong>{" "}
                      {formatSalaryInINR(job.salary.min)} -{" "}
                      {formatSalaryInINR(job.salary.max)}
                    </p>

                    <strong>Requirements:</strong>
                    <ul>
                      {job.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex}>{requirement}</li>
                      ))}
                    </ul>

                    {/* Time with FaClock icon and Bootstrap badge */}
                    <div className="d-flex align-items-center justify-content-between">
                      <p
                        className="mt-4"
                        style={{ backgroundColor: "#eafcff", color: "#008BDC" }}
                      >
                        <FaClock className="" />
                        <span
                          className="badge p-2"
                          style={{ color: "#008BDC" }}
                        >
                          {dayjs(job.createdAt).fromNow()}
                        </span>
                      </p>
                      <Link
                        to={`/job/${job._id}`}
                        className="btn btn-success mt-3"
                        style={{ width: "30%", fontWeight: "bold" }}
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
