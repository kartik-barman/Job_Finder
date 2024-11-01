import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../components/NavBar";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Dashboard = () => {
  const employerId = localStorage.getItem("userId");
  const [jobs, setJobs] = useState([]);

  const fetchAllJobs = async () => {
    try {
      const res = await axios.get(
        `https://job-finder-one.vercel.app/api/jobs/get/job/employer/${employerId}`
      );
      console.log(res.data.jobs);
      setJobs(res.data.jobs);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deletJob = async (id) => {
    try {
      const res = await axios.delete(
        `https://job-finder-one.vercel.app/api/jobs/delete-job/${id}`
      );
      const result = res.data;
      console.log(result);
      fetchAllJobs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, [employerId]);

  return (
    <>
      <NavBar />
      <div style={{ padding: "2rem" }}>
        {/* Dashboard Header */}
        <header
          style={{
            backgroundColor: "#343a40",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Employer Dashboard</h1>
        </header>

        {/* Users Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            className="table table-striped table-bordered table-hover"
            style={{
              borderRadius: "8px",
              border: "1px solid #dee2e6",
              marginBottom: 0,
            }}
          >
            <thead
              style={{
                backgroundColor: "#f8f9fa",
                color: "#495057",
                fontWeight: "bold",
              }}
            >
              <tr>
                <th style={{ minWidth: "100px", textAlign: "center" }}>
                  Sl No
                </th>
                <th style={{ minWidth: "200px", textAlign: "center" }}>Job Title</th>
                <th style={{ minWidth: "250px", textAlign: "center" }}>
                  Type
                </th>
                <th style={{ minWidth: "150px", textAlign: "center" }}>Salary</th>
                <th style={{ minWidth: "150px", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{textAlign : "center"}}>
                    <Link to={`/employer/${job._id}/candidates`} className="text-decoration-none">
                    {job.title}
                    </Link>
                    </td>
                  <td style={{textAlign : "center"}}>{job.type}</td>
                  <td style={{ textAlign: "center" }}>₹{""}{job.salary.min}-{job.salary.max}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      style={{
                        backgroundColor: "#ffc107",
                        border: "none",
                        color: "#fff",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => console.log(`Edit ${job.title}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        border: "none",
                        color: "#fff",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => deletJob(job._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Users Message */}
        {jobs.length === 0 && (
          <div
            style={{ textAlign: "center", marginTop: "1rem", color: "#6c757d" }}
          >
            No users found.
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
