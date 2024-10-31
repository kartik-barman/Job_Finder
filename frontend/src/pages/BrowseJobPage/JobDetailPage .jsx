import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, 
  FaBuilding, FaUsers, FaCheckCircle, FaRegBookmark,
  FaShare, FaLinkedin, FaFacebook, FaTwitter,
  FaGraduationCap, FaMedal, FaRegCalendarAlt
} from 'react-icons/fa';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import { useJobContext } from '../../store/JobContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetailPage = () => {
    const [job, setJob] = useState(null)
    const {isLoggedIn} = useJobContext();
    const {id : jobId} = useParams();
    console.log(useParams);
    console.log(isLoggedIn);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(()=>{
    const getJobDetails = async ()=> {
        try {
            const res = await axios.get(`https://job-finder-one.vercel.app/api/jobs/${jobId}`);
            const result = res.data;
            console.log("Result : ", result.job);
            setJob(result.job)
        } catch (error) {
            console.error("Error : ", error)
        }
    }
    getJobDetails()
  }, [jobId])

  if (!job) {
    return <div>Loading...</div>; // Display a loading message while fetching data
}

  const jobData = {
    title: job.title,
    company: job.company,
    location: job.location,
    salary:  `${job.salary.min} - ${job.salary.max}`,
    type: job.type,
    experience: "5+ years",
    department: "Engineering",
    postedDate: "2 days ago",
    deadline: "30 days remaining",
    companySize: "500-1000 employees",
    companyLogo: "/api/placeholder/100/100",
    description: `${job.description}`,
    responsibilities: [
      "Design and implement scalable web applications using React and Node.js",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and mentor junior developers",
      "Optimize applications for maximum speed and scalability"
    ],
    requirements: [
      "5+ years of experience in full stack development",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with cloud services (AWS/Azure/GCP)",
      "Excellent problem-solving and communication skills",
      "Bachelor's degree in Computer Science or related field"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible working hours and remote options",
      "Professional development budget",
      "401(k) matching"
    ],
    skills: job.requirements
  };

  return (
    <>
     <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "1000",
          backgroundColor: "rgb(204 57 232)",
        }}
      >
        <NavBar />
      </div>
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header Section */}
        <div className="card mb-4" style={{
          borderRadius: '15px',
          border: 'none',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease',
        }}>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-8">
                <div className="d-flex align-items-center mb-3">
                  {/* <img 
                    src={jobData.companyLogo} 
                    alt="Company Logo" 
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '10px',
                      marginRight: '20px'
                    }}
                  /> */}
                  <div>
                    <h1 className="h3 mb-2" style={{ color: '#2c3e50' }}>
                      {jobData.title}
                    </h1>
                    <div className="d-flex align-items-center text-muted">
                      <FaBuilding style={{ marginRight: '8px' }} />
                      {jobData.company}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-3">
                  <div className="d-flex align-items-center text-muted">
                    <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                    {jobData.location}
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <FaBriefcase style={{ marginRight: '8px' }} />
                    {jobData.type}
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <FaDollarSign style={{ marginRight: '8px' }} />
                    {jobData.salary}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 d-flex justify-content-lg-end align-items-start mt-3 mt-lg-0">
                <Link to={isLoggedIn ? `/job/application/${jobId}` : `/login`}
                  className="btn btn-primary me-2"
                  style={{
                    padding: '10px 30px',
                    borderRadius: '25px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#4CAF50',
                    border: 'none'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Apply Now
                </Link>
                <button 
                  className={`btn btn-outline-primary`}
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <FaRegBookmark style={{ color: isBookmarked ? '#4CAF50' : '#6c757d' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Left Column - Main Job Information */}
          <div className="col-lg-8">
            {/* Job Description */}
            <div className="card mb-4" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 0 15px rgba(0,0,0,0.05)'
            }}>
              <div className="card-body p-4">
                <h4 className="mb-4">Job Description</h4>
                <p className="text-muted">{jobData.description}</p>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="card mb-4" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 0 15px rgba(0,0,0,0.05)'
            }}>
              <div className="card-body p-4">
                <h4 className="mb-4">Key Responsibilities</h4>
                <ul className="list-unstyled">
                  {jobData.responsibilities.map((item, index) => (
                    <li key={index} className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="text-success mt-1 me-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div className="card mb-4" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 0 15px rgba(0,0,0,0.05)'
            }}>
              <div className="card-body p-4">
                <h4 className="mb-4">Requirements</h4>
                <ul className="list-unstyled">
                  {jobData.requirements.map((item, index) => (
                    <li key={index} className="mb-3 d-flex align-items-start">
                      <FaMedal className="text-primary mt-1 me-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Information */}
          <div className="col-lg-4">
            {/* Job Overview */}
            <div className="card mb-4" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 0 15px rgba(0,0,0,0.05)'
            }}>
              <div className="card-body p-4">
                <h4 className="mb-4">Job Overview</h4>
                <div className="mb-3 d-flex align-items-center">
                  <FaRegCalendarAlt className="text-primary me-3" />
                  <div>
                    <div className="text-muted">Posted Date</div>
                    <div>{jobData.postedDate}</div>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <FaClock className="text-primary me-3" />
                  <div>
                    <div className="text-muted">Deadline</div>
                    <div>{jobData.deadline}</div>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <FaUsers className="text-primary me-3" />
                  <div>
                    <div className="text-muted">Company Size</div>
                    <div>{jobData.companySize}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="card mb-4" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 0 15px rgba(0,0,0,0.05)'
            }}>
              <div className="card-body p-4">
                <h4 className="mb-4">Required Skills</h4>
                <div className="d-flex flex-wrap gap-2">
                  {jobData.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="badge"
                      style={{
                        backgroundColor: '#e9ecef',
                        color: '#2c3e50',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.backgroundColor = '#dee2e6';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="card" style={{
              borderRadius: '15px',
              border: 'none',
              boxShadow: '0 0 15px rgba(0,0,0,0.05)'
            }}>
              <div className="card-body p-4">
                <h4 className="mb-4">Benefits</h4>
                <ul className="list-unstyled">
                  {jobData.benefits.map((benefit, index) => (
                    <li key={index} className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="text-success mt-1 me-3" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-4 text-center">
          <h5 className="mb-3">Share this job</h5>
          <div className="d-flex justify-content-center gap-3">
            {[FaLinkedin, FaFacebook, FaTwitter].map((Icon, index) => (
              <button 
                key={index}
                className="btn btn-light"
                style={{
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default JobDetailPage;