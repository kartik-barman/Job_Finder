import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ApplicantDetails = () => {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/job/application/${jobId}/candidates`
      );
      const data = res.data;
      setCandidates(data.candidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const statusOptions = [
    "applied",
    "submitted",
    "pending",
    "verified",
    "selected",
    "rejected",
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Applicant Details
      </h2>
      {candidates.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>SL NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Status</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={candidate._id}>
                  <td>{index + 1}</td>
                  <td>{candidate.applicantName}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.collegeName}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {statusOptions.map((status) => (
                        <span
                          key={status}
                          className={`badge me-2 ${
                            candidate.applicationStatus === status
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                          style={{
                            display:
                              candidate.applicationStatus === status
                                ? "inline"
                                : "none",
                          }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      ))}
                      <select
                        className="form-select"
                        value={candidate.applicationStatus}
                        onChange={(e) => {
                          // Handle status change logic here
                          console.log(
                            `Updated status for ${candidate.applicantName}: ${e.target.value}`
                          );
                          // Update logic here (e.g., make a PUT request to update the status in the backend)
                        }}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <a
                      href={`http://localhost:5000/${candidate.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No candidates found for this job.</p>
      )}
    </div>
  );
};

export default ApplicantDetails;
