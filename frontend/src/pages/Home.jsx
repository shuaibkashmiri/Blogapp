import React, { useEffect, useState } from "react";

import axios from "axios";
import BlogCard from "../components/sharedComponents/BlogCard";
import Authorized from "../auth/Authorized";

const Home = () => {
  Authorized();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/blog/all`);

      setBlogs(resp.data.blogs);
      console.log(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="home-container">
        <h1>Latest Blogs</h1>
        <div className="blog-cards-grid">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              content={blog.content}
              image={blog.image}
              author={blog.author?.fullname}
              _id={blog._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
