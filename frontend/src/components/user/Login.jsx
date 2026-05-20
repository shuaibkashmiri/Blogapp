import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        formData,
      );

      if (res.data.message == "User Logged In Successfully") {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("email", formData.email);
        navigate("/user/dashboard");
      } else {
        toast.error(res.data.message);
      }

      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="main-reg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login to Your Account</h2>

          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              name="email"
              value={formData.email}
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
              value={formData.password}
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
            Login
          </button>
          {/* Register buttons */}
          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
