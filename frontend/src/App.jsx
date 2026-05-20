import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/sharedComponents/Navbar";
import Register from "./components/user/Register";

import Login from "./components/user/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Dashboard from "./components/user/Dashboard";
import FullBlog from "./pages/FullBlog";
import Footer from "./components/sharedComponents/Footer";
import PageNotFound from "./pages/PageNotFound";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/blog/:_id" element={<FullBlog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
