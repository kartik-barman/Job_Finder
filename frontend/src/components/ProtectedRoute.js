// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useJobContext } from "../store/JobContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userRole } = useJobContext();

  // Show a placeholder until authentication status is confirmed
  if (isLoggedIn === null || userRole === null) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
