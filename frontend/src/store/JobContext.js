// src/store/JobContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const JobContext = createContext();

// Custom hook to use the JobContext
export const useJobContext = () => useContext(JobContext);

export const JobsProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [jobs, setJobs] = useState([]);

  // Load token and role from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  return (
    <JobContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole, jobs, setJobs }}
    >
      {children}
    </JobContext.Provider>
  );
};
