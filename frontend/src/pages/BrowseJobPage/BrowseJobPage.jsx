import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaDollarSign,
  FaRegClock,
  FaRegBookmark,
  FaBookmark,
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import { useJobContext } from '../../store/JobContext';

const BrowseJobPage = () => {
  const { jobs = [], setJobs } = useJobContext(); // Set default value to []
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());

  // Fetch jobs from the API
  useEffect(() => {
    axios.get('https://job-finder-one.vercel.app/api/jobs/')
      .then(response => {
        setJobs(Array.isArray(response.data.jobs) ? response.data.jobs : []); // Ensure response is an array
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
      });
  }, [setJobs]);

  // Helper function to calculate time since posted
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }

    return "just now";
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row">
          {/* Filters Sidebar */}
          <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title mb-0">Filters</h5>
                  <button 
                    className="btn btn-link text-danger d-lg-none p-0" 
                    onClick={() => setShowFilters(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                
                {/* Job Type Filter */}
                <div className="mb-4">
                  <h6 className="mb-3">Job Type</h6>
                  {['Full Time', 'Part Time', 'Contract', 'Remote'].map(type => (
                    <div className="form-check mb-2" key={type}>
                      <input className="form-check-input" type="checkbox" id={type} />
                      <label className="form-check-label" htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </div>

                {/* Experience Level */}
                <div className="mb-4">
                  <h6 className="mb-3">Experience Level</h6>
                  {['Entry Level', 'Mid Level', 'Senior Level', 'Manager'].map(level => (
                    <div className="form-check mb-2" key={level}>
                      <input className="form-check-input" type="checkbox" id={level} />
                      <label className="form-check-label" htmlFor={level}>{level}</label>
                    </div>
                  ))}
                </div>

                {/* Salary Range */}
                <div className="mb-4">
                  <h6 className="mb-3">Salary Range</h6>
                  <select className="form-select">
                    <option>All Ranges</option>
                    <option>$30k - $50k</option>
                    <option>$50k - $80k</option>
                    <option>$80k - $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <h6 className="mb-3">Skills</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {['React', 'Python', 'Java', 'Node.js', 'SQL'].map(skill => (
                      <div 
                        key={skill}
                        className="badge bg-light text-dark border px-3 py-2"
                        style={{ cursor: 'pointer' }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="col-lg-9">
            {/* Mobile Filter Toggle */}
            <div className="d-lg-none mb-3">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => setShowFilters(true)}
              >
                <FaFilter className="me-2" />
                Show Filters
              </button>
            </div>

            {/* Results Info */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="mb-0">Showing {jobs.length} jobs</p>
              <select className="form-select ms-3" style={{ width: 'auto' }}>
                <option>Most Recent</option>
                <option>Most Relevant</option>
                <option>Highest Paid</option>
              </select>
            </div>

            {/* Job Cards */}
            {jobs.map((job) => (
              <div className="card border-0 shadow-sm mb-4 hover-shadow" key={job._id} style={{ transition: 'all 0.3s' }}>
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title mb-1">{job.title}</h5>
                          <p className="text-muted mb-2">{job.company}</p>
                        </div>
                        <button 
                          className="btn btn-link p-0"
                          onClick={() => toggleSaveJob(job._id)}
                        >
                          {savedJobs.has(job._id) ? (
                            <FaBookmark className="text-success" />
                          ) : (
                            <FaRegBookmark className="text-muted" />
                          )}
                        </button>
                      </div>
                      <div className="d-flex flex-wrap gap-3 mb-3">
                        <span className="text-muted small">
                          <FaMapMarkerAlt className="me-1" />
                          {job.location}
                        </span>
                        <span className="text-muted small">
                          <FaBriefcase className="me-1" />
                          {job.type}
                        </span>
                        <span className="text-muted small">
                          ₹
                          {job.salary.min} - {job.salary.max} {job.salary.currency}
                        </span>
                        <span className="text-muted small">
                          <FaRegClock className="me-1" />
                          {timeSince(job.createdAt)}
                        </span>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {job.requirements.map(skill => (
                          <span 
                            key={skill}
                            className="badge bg-light text-dark"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-outline-success">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <nav className="d-flex justify-content-center mt-5">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobPage;
