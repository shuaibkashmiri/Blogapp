import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { email, token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
                    to="/user/dashboard"
                    className="btn btn-outline-success me-2"
                    type="submit"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
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
