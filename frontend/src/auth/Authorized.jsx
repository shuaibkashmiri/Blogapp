import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Authorized = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const checkAuth = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/cl-auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resp.data.success !== true) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    checkAuth();
  }, [isAuthenticated, token]);

  return null;
};

export default Authorized;
