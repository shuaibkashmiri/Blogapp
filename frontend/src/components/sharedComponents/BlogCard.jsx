import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  title,
  content,
  image,
  author,
  _id,
  isOwn,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <p className="card-text">{content}</p>
        {author ? <p>{author}</p> : null}
        <div className="d-flex gap-2 flex-wrap">
          <Link to={`/blog/${_id}`} className="btn btn-success">
            Read Full Blog
          </Link>
          {isOwn ? (
            <>
              <button
                className="btn btn-primary"
                onClick={onEdit}
                type="button"
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={onDelete}
                type="button"
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
