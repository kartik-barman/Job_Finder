// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/Jobs/JobDetails";
import { JobsProvider } from "./store/JobContext.js";
import LogIn from "./pages/Auth/LogIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import JobForm from "./components/JobForm.jsx";
import Dashboard from "./pages/Employer/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.js";
import JobApplicationForm from "./pages/Candidate/ApplicationForm/JobApplicationForm .jsx";
import ApplicantDetails from "./pages/Employer/Applicant/ApplicantDetails.jsx";
import JobDetailPage from "./pages/BrowseJobPage/JobDetailPage .jsx";
import Profile from "./pages/Candidate/Profile/Profile.jsx";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import UpdateJob from "./pages/Employer/UpdateJob.jsx";



const App = () => {
  return (
    <JobsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/details/:id" element={ <JobDetailPage /> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute>
                <JobForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:jobId"
            element={
              <ProtectedRoute>
                <UpdateJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/profile/:username"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/job/application/:id" element={
            <ProtectedRoute>
              <JobApplicationForm />
            </ProtectedRoute>
          } />
          <Route
            path="/employer/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/employer/:jobId/candidates" 
          element={
            <ProtectedRoute>
              <ApplicantDetails />
            </ProtectedRoute>
          }>
          </Route>
          {/* Admin Route */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }>

          </Route>
        </Routes>
      </Router>
    </JobsProvider>
  );
};

export default App;
