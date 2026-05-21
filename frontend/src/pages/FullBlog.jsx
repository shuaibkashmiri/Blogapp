import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./FullBlog.css";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const FullBlog = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { token, userId: currentUserId } = useAuth();
  const [blog, setBlog] = useState({});
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const getBlog = async () => {
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setBlog(resp.data.blog);
      setLikeCount(resp.data.blog.likes.length);
      setComments(resp.data.blog.comments);
      if (resp.data.blog.likes.includes(currentUserId)) {
        setLiked(true);
      } else {
        setLiked(false);
      }

      console.log(comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const resp = await axios.put(
        `${import.meta.env.VITE_API_URL}/blog/like/${_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getBlog();
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async () => {
    const confirmDelete = window.confirm("Do you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blog/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog deleted successfully.");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete blog.");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        `${import.meta.env.VITE_API_URL}/blog/comment/${_id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Comment Posted");
      getBlog();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, [likeCount, liked]);
  return (
    <>
      <div className="full-blog">
        <h3 className="blog-title">{blog.title}</h3>
        <img className="blog-image" src={blog.image} alt="" />
        <p className="blog-content">{blog.content}</p>

        {/* <button
          className={liked ? "btn btn-success" : "btn btn-secondary "}
          onClick={handleLike}
        >
          {liked ? "Liked" : "Like"}
        </button> */}

        {liked ? (
          <FaHeart
            size={"30"}
            color="red"
            onClick={handleLike}
            cursor={"pointer"}
          />
        ) : (
          <FaRegHeart size={"30"} onClick={handleLike} cursor={"pointer"} />
        )}
        <span>{`  ${likeCount} Likes`}</span>
        {blog.author?._id === currentUserId ? (
          <button
            className="btn btn-danger mt-3"
            type="button"
            onClick={deleteBlog}
          >
            Delete Blog
          </button>
        ) : null}
        <div className="container">
          <div className="card mt-4">
            <div className="card-header bg-white">Add a Comment</div>
            <div className="card-body">
              <form onSubmit={addComment}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Add your comment..."
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Comment
                </button>
              </form>
            </div>
          </div>

          {comments &&
            comments.map((comment, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex">
                    <div>
                      <h6 className="card-title text-primary mb-1">
                        {comment.user.fullname}
                      </h6>

                      <p className="card-text">{comment.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <FaHeart color="red" />
      </div>
    </>
  );
};

export default FullBlog;
