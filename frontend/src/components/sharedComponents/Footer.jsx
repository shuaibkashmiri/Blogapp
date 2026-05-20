import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-5  mt-5">
      <div className="container">
        <div className="row">
          {/* Column 1: About the Blog */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">My Dev Blog</h5>
            <p className="text-dark-50">
              Sharing insights on web development, React, and modern UI design.
              Stay curious and keep coding.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/"
                  className="text-dark-50 text-decoration-none hover-dark"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-dark-50 text-decoration-none hover-dark"
                >
                  Blog Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-dark-50 text-decoration-none hover-dark"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-dark-50 text-decoration-none hover-dark"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Icons */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Follow Me</h5>
            <div className="d-flex gap-3">
              <Link to="https://twitter.com" className="text-dark fs-4">
                <FaTwitter />
              </Link>
              <Link to="https://github.com" className="text-dark fs-4">
                <FaGithub />
              </Link>
              <Link to="https://linkedin.com" className="text-dark fs-4">
                <FaLinkedin />
              </Link>
              <Link to="mailto:hello@example.com" className="text-dark fs-4">
                <FaEnvelope />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <hr className="border-secondary" />
        <div className="text-center text-dark-50 pt-3">
          <small>
            &copy; {new Date().getFullYear()} My Dev Blog. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
