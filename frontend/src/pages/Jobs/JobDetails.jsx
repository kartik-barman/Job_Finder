import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  FaMoneyBillWave,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import NavBar from "../../components/NavBar";

// Add the relativeTime plugin to dayjs
dayjs.extend(relativeTime);

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL params
  const [job, setJob] = useState(null);

  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(res.data.job);
    } catch (error) {
      console.log("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div style={{ backgroundColor: "#f5f2f6" }}>
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
      <div className="container my-5">
        <div
          className="card p-4 shadow-lg"
          style={{
            border: "none",
            "--card-bg": "linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)",
            "--highlight-color": "#ff5e62",
            "--secondary-color": "#007bff",
            "--success-color": "#28a745",
            "--warning-color": "#ffc107",
            "--info-color": "#17a2b8",
            background: "var(--card-bg)",
          }}
        >
          <h2 className="mb-3" style={{ color: "var(--highlight-color)" }}>
            {job.title}
          </h2>
          <p className="mb-3 text-muted">{job.description}</p>

          <div className="mb-4">
            <FaBuilding style={{ color: "var(--secondary-color)" }} />
            <strong style={{ color: "var(--secondary-color)" }}>
              {" "}
              {job.company}
            </strong>
          </div>

          <div className="mb-4">
            <FaMapMarkerAlt style={{ color: "var(--success-color)" }} />
            <span className="text-muted"> {job.location}</span>
          </div>

          <div className="mb-4">
            <FaMoneyBillWave style={{ color: "var(--warning-color)" }} />
            <span className="text-muted">
              {" "}
              {job.salary.min} - {job.salary.max} INR
            </span>
          </div>

          <div className="mb-4">
            <span
              className="badge badge-primary p-2"
              style={{ backgroundColor: "var(--secondary-color)" }}
            >
              Type: {job.type}
            </span>
          </div>

          <div className="mb-4">
            <strong>Requirements:</strong>
            <ul>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <FaClock />{" "}
            <span
              className="badge badge-info"
              style={{ backgroundColor: "var(--info-color)" }}
            >
              {dayjs(job.createdAt).fromNow()}
            </span>
          </div>

          <Link
            to={`/job/application/${job._id}`}
            className="btn btn-danger btn-block mt-3 w-25"
            style={{
              fontWeight: "bold",
              backgroundColor: "var(--highlight-color)",
              border: "none",
            }}
          >
            Apply Now This
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
