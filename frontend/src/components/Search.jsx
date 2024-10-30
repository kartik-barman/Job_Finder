import React, { useState } from "react";
import axios from "axios";
import { useJobContext } from "../store/JobContext";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const { jobs, setJobs } = useJobContext();

  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  // Fetch filtered jobs based on search parameters
  const fetchFilterData = async () => {
    try {
      setError(""); // Clear previous error messages
      const res = await axios.get(
        `http://localhost:5000/api/jobs/search?keyword=${keyword}&location=${location}&type=${category}`
      );
      const data = await res.data;
      setJobs(data.jobs);
      setResults(data.jobs); // Set search results
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("No jobs found for the given search criteria.");
      } else {
        setError("An error occurred while fetching job data.");
      }
      setResults(null); // Clear previous results
    }
  };

  const handleSubmit = () => {
    fetchFilterData();
    // Clear input fields after submission
    setKeyword("");
    setLocation("");
    setCategory("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container mt-4 p-5">
      <div className="row g-2 align-items-center bg-white p-4 rounded">
        {/* Search Keyword Input */}
        <div className="col-12 col-md-4">
          <input
            type="text"
            placeholder="Search keyword"
            className="form-control"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown} // Listen for Enter key
          />
        </div>

        {/* Location Select Dropdown */}
        <div className="col-12 col-md-3">
          <select
            className="form-select"
            aria-label="Location"
            value={location}
            onChange={handleLocationChange}
            onKeyDown={handleKeyDown} // Listen for Enter key
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
            className="form-select"
            aria-label="Category"
            value={category}
            onChange={handleCategoryChange}
            onKeyDown={handleKeyDown} // Listen for Enter key
          >
            <option value="">Category</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Find Job Button */}
        <div className="col-12 col-md-2">
          <button className="btn btn-success w-100" onClick={handleSubmit}>
            Find Job
          </button>
        </div>
      </div>

      {/* Display search results or error message */}
      <div className="mt-4">
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Search;
