import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        "http://localhost:5000/api/v1/blog/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.message == "Blog Posted Successfully") {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="blogForm">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Blog Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Blog Content
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            placeholder="Enter Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            Choose an image
          </label>
          <input
            className="form-control"
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">{loading ? "Posting...." : "Post"}</button>
      </form>
    </>
  );
};

export default BlogForm;
