import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import jobBanner from "../assets/job-illustation.png";
import Search from "../components/Search";
import JobList from "./Jobs/JobList";
import Footer from "../components/Footer";
import BrowseJobPage from "./BrowseJobPage/BrowseJobPage";

const Home = () => {
  const [gradient, setGradient] = useState("");

  // Function to generate a random color in hexadecimal format
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  };

  // Generate two random colors and set the gradient background
  useEffect(() => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    setGradient(`linear-gradient(135deg, ${color1}, ${color2})`);
  }, []);

  return (
    <>
      <div
        className="w-100 min-vh-100"
        style={{
          background: gradient, // Set the generated gradient
        }}
      >
        <NavBar />
        <div>
          <div className="container mt-5">
            <div className="row">
              {/* Left Content */}
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <div className="text-white h4 mb-3">4536+ Jobs listed</div>
                <h1 className="text-white display-4 fw-bold">
                  Find your Dream Job
                </h1>
                <p className="text-white lead mb-4">
                  We provide online instant cash loans with quick approval that
                  suit your term length.
                </p>
                <button className="btn btn-success rounded w-50 w-lg-50">
                  Upload Your Resume
                </button>
              </div>

              {/* Right Content */}
              <div className="col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center align-items-center">
                <img
                  src={jobBanner}
                  alt="Job statistics illustration"
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </div>

            {/* Search Bar */}
            <Search />
          </div>
        </div>
      </div>
      {/* <JobList /> */}
      <BrowseJobPage />
      <Footer />
    </>
  );
};

export default Home;
