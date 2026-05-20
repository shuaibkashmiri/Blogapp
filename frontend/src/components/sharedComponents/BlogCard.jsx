import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ title, content, image, author, _id }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <p className="card-text">{content}</p>
        <p>{author}</p>
        <Link to={`/blog/${_id}`} className="btn btn-success">
          Read Full Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
