import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pnf">
      <h1>404</h1>
      <h1>Page Not Found</h1>
      <Link to={"/"} className="btn btn-primary">
        Back To Home
      </Link>
    </div>
  );
};

export default PageNotFound;
