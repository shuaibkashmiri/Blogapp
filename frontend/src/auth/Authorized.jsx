import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Authorized = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    return navigate("/login");
  }

  const checkAuth = async () => {
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
        return navigate("/login");
        toast.error("Login First");
      }
      return true;
    } catch (error) {
      return navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
};

export default Authorized;
