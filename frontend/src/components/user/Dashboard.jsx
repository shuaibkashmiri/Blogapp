import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Authorized from "../../auth/Authorized";
import BlogForm from "../sharedComponents/BlogForm";
import BlogCard from "../sharedComponents/BlogCard";

const Dashboard = () => {
  Authorized();
  const [blogs, setBlogs] = useState([]);

  const myBlogs = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/blog/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myBlogs();
  }, []);
  return (
    <>
      <div className="dashboard">
        <BlogForm />
        <h3>My Blogs</h3>
        <div className="myblogs">
          {blogs.map((blog) => (
            <BlogCard
              title={blog.title}
              content={blog.content}
              image={blog.image}
              _id={blog._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
