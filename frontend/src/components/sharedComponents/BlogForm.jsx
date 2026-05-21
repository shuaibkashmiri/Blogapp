import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BlogForm = ({ initialData, blogId, onSuccess, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setImage(null);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = blogId
        ? `${import.meta.env.VITE_API_URL}/blog/${blogId}`
        : `${import.meta.env.VITE_API_URL}/blog/create`;
      const method = blogId ? axios.put : axios.post;
      const res = await method(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.message) {
        const successMessage = blogId
          ? "Blog updated successfully"
          : "Blog Posted Successfully";
        if (res.data.message.toLowerCase().includes("success")) {
          toast.success(res.data.message || successMessage);
        } else {
          toast.error(res.data.message);
        }
      }

      if (!blogId) {
        setTitle("");
        setContent("");
        setImage(null);
      }
      if (onSuccess) onSuccess();
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to save blog. Please try again.");
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
            {blogId ? "Update image (optional)" : "Choose an image"}
          </label>
          <input
            className="form-control"
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="d-flex gap-2">
          <button type="submit">
            {loading
              ? blogId
                ? "Updating..."
                : "Posting..."
              : blogId
                ? "Update Blog"
                : "Post"}
          </button>
          {blogId && onCancel ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default BlogForm;
