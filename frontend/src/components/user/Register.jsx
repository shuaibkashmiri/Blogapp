import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const [formdata, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        formdata,
      );
      if (res.data.message == "User Created Successfully !") {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      console.log(res.data);

      setFormData({ fullname: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="main-reg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Register With Us</h2>
          {/* Fullname */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="text"
              id="form2Example1"
              className="form-control"
              name="fullname"
              value={formdata.fullname}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example1">
              Fullname
            </label>
          </div>
          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              name="email"
              value={formdata.email}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>
          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              name="password"
              value={formdata.password}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-block mb-4"
          >
            Register
          </button>
          {/* Register buttons */}
          <div className="text-center">
            <p>
              Already a member? <Link to="/login">Login</Link>
            </p>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
            >
              <i className="fab fa-facebook-f" />
            </button>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
            >
              <i className="fab fa-google" />
            </button>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
            >
              <i className="fab fa-twitter" />
            </button>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
            >
              <i className="fab fa-github" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
