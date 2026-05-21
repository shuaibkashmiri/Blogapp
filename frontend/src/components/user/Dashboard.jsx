import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Authorized from "../../auth/Authorized";
import { useAuth } from "../../context/AuthContext";
import BlogForm from "../sharedComponents/BlogForm";
import BlogCard from "../sharedComponents/BlogCard";

const Dashboard = () => {
  Authorized();
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const myBlogs = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/blog/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load your blogs.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog deleted successfully.");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete blog.");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
  };

  const handleSave = () => {
    setEditingBlog(null);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    myBlogs();
  }, [refresh]);

  return (
    <>
      <div className="dashboard">
        <h3>{editingBlog ? "Edit Blog" : "Create a Blog"}</h3>
        <BlogForm
          initialData={editingBlog}
          blogId={editingBlog?._id}
          onSuccess={handleSave}
          onCancel={editingBlog ? handleCancelEdit : undefined}
        />
        <h3>My Blogs</h3>
        <div className="myblogs">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              content={blog.content}
              image={blog.image}
              _id={blog._id}
              isOwn
              onEdit={() => handleEdit(blog)}
              onDelete={() => handleDelete(blog._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
