import React, { useState } from "react";
import axios from "axios";
import { useJobContext } from "../store/JobContext";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const { jobs, setJobs } = useJobContext();

  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const fetchFilterData = async () => {
    try {
      setError("");
      const res = await axios.get(
        `https://job-finder-one.vercel.app/api/jobs/search?keyword=${keyword}&location=${location}&type=${category}`
      );
      const data = await res.data;
      if (data.jobs.length === 0) {
        setError("No jobs found for the given search criteria.");
      } else {
        setJobs(data.jobs);
      }
    } catch (error) {
      setError("An error occurred while fetching job data.");
    }
  };

  const handleSubmit = () => {
    fetchFilterData();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={{ marginTop: "2rem", padding: "2rem" }}>
      <div style={{ padding: "1.5rem", borderRadius: "8px", backgroundColor: "#f8f9fa", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)" }}>
        <div className="row g-3 align-items-center">
          {/* Search Keyword Input */}
          <div className="col-12 col-md-4">
            <input
              type="text"
              placeholder="Search keyword"
              value={keyword}
              onChange={handleKeywordChange}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                border: "1px solid #ced4da",
                outline: "none",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Location Select Dropdown */}
          <div className="col-12 col-md-3">
            <select
              value={location}
              onChange={handleLocationChange}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                border: "1px solid #ced4da",
                outline: "none",
                fontSize: "1rem",
                backgroundColor: "#fff",
              }}
            >
              <option value="">Location</option>
              <option value="kolkata">Kolkata</option>
              <option value="howrah">Howrah</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="NewYork">New York</option>
            </select>
          </div>

          {/* Category Select Dropdown */}
          <div className="col-12 col-md-3">
            <select
              value={category}
              onChange={handleCategoryChange}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                border: "1px solid #ced4da",
                outline: "none",
                fontSize: "1rem",
                backgroundColor: "#fff",
              }}
            >
              <option value="">Category</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">internship</option>
            </select>
          </div>

          {/* Find Job Button */}
          <div className="col-12 col-md-2">
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1rem",
                color: "#fff",
                backgroundColor: "#28a745",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              Find Job
            </button>
          </div>
        </div>

        {/* Display error message */}
        <div style={{ marginTop: "1rem", color: "#dc3545", textAlign: "center" }}>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Search;
