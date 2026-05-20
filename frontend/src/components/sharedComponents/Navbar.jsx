import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
            </ul>
            <form className="d-flex align-items-center" role="search">
              {token ? (
                <>
                  <span className="navbar-text me-3">
                    {email ? `Logged in as ${email}` : "Logged in"}
                  </span>
                  <Link
                    to={"/user/dashboard"}
                    className="btn btn-outline-success"
                    type="submit"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  to={"/login"}
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Login
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
