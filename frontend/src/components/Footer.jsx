import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaSearch,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic
  };

  return (
    <footer className="bg-dark text-white" style={{
      background: "linear-gradient(to right, #1a1a1a, #2d2d2d)"
    }}>
      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info Section */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-4">
              <Link to="/" className="text-decoration-none">
                <div className="d-flex align-items-center mb-3">
                  <div className="d-flex justify-content-center align-items-center me-2 rounded-circle bg-success" 
                       style={{ width: "40px", height: "40px" }}>
                    <FaSearch className="text-white" />
                  </div>
                  <h4 className="text-white mb-0">JOB FINDER</h4>
                </div>
              </Link>
              <p className="text-secondary mb-4">
                Find your dream job with our comprehensive job search platform. 
                Connect with top employers and take the next step in your career.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2">
                  <FaFacebookF />
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2">
                  <FaTwitter />
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle p-2">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 text-white">Quick Links</h5>
            <ul className="list-unstyled">
              {['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Career Tips', 'FAQ'].map((item) => (
                <li key={item} className="mb-2">
                  <Link to="#" className="text-secondary text-decoration-none d-flex align-items-center hover-link"
                        style={{ transition: 'all 0.3s' }}>
                    <FaArrowRight className="me-2" style={{ fontSize: '12px' }} />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 text-white">Job Categories</h5>
            <ul className="list-unstyled">
              {['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Remote Jobs'].map((item) => (
                <li key={item} className="mb-2">
                  <Link to="#" className="text-secondary text-decoration-none d-flex align-items-center hover-link"
                        style={{ transition: 'all 0.3s' }}>
                    <FaArrowRight className="me-2" style={{ fontSize: '12px' }} />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 text-white">Newsletter</h5>
            <form onSubmit={handleNewsletterSubmit} className="mb-4">
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: 'white' }}
                />
                <button className="btn btn-success" type="submit">Subscribe</button>
              </div>
            </form>

            <h5 className="mb-4 text-white">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <FaMapMarkerAlt className="text-success me-3" />
                <span className="text-secondary">Mathabhanga, Coochbehar, West Bengal, 736146</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <FaPhoneAlt className="text-success me-3" />
                <span className="text-secondary">+91 865336744</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <FaEnvelope className="text-success me-3" />
                <span className="text-secondary">jobfinder.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <small className="text-secondary">
                © {new Date().getFullYear()} Job Finder. All rights reserved.
              </small>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link to="#" className="text-secondary text-decoration-none mx-2">Privacy</Link>
              <Link to="#" className="text-secondary text-decoration-none mx-2">Terms</Link>
              <Link to="#" className="text-secondary text-decoration-none mx-2">Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS */}
      <style>
        {`
          .hover-link:hover {
            color: white !important;
            transform: translateX(5px);
          }
          .form-control::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          .form-control:focus {
            background: rgba(255, 255, 255, 0.2);
            box-shadow: none;
            border: none;
            color: white;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;