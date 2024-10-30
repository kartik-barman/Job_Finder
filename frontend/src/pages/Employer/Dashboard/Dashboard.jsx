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

  useEffect(() => {
    fetchAllJobs();
  }, [employerId]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ backgroundColor: "rgb(204 57 232)" }}>
        <NavBar />
      </div>
      <div className="container my-4">
        <h2 className="text-center mb-4">Employer Dashboard</h2>

        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>SL</th>
              <th>Job Title</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/employer/${job._id}/candidates`}>
                      {job.title}
                    </Link>
                  </td>
                  <td>{job.type}</td>
                  <td>
                    ₹{job.salary.min}-{job.salary.max}
                  </td>
                  <td>
                    <button className="btn btn-primary me-2"><FaEdit /></button>
                    <button className="btn btn-danger"><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
