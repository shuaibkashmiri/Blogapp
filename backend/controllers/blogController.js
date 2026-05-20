import cloudinary from "../config/cloudinary.js";
import { Blog } from "../models/blogModal.js";
import path from "path";

export const createBlog = async (req, res) => {
  try {
    const userid = req.user;
    console.log(userid);
    const { title, content } = req.body;
    const filePath = req.file.path;
    if (!title || !content) {
      return res.json({ message: "All fields are Required" });
    }
    if (!filePath) {
      return res.json({ message: "image file is required" });
    }

    const result = await cloudinary.uploader.upload(filePath);
    const imageUrl = result.secure_url;

    const newBlog = await Blog.create({
      title,
      content,
      image: imageUrl,
      author: userid,
    });

    if (!newBlog) {
      return res.json({ message: "Something went Wrong" });
    }
    return res
      .status(201)
      .json({ message: "Blog Posted Successfully", newBlog });
  } catch (error) {
    console.log(error);
  }
};

export const getAllblogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    if (!blogs) {
      return res.json({ message: "No Blogs" });
    }
    return res.json({ blogs });
  } catch (error) {
    console.log(error);
  }
};

export const myBlogs = async (req, res) => {
  try {
    const userId = req.user;
    const blogs = await Blog.find({ author: userId });
    if (!blogs) {
      return res.json({ message: "You Have Not posted a blog yet" });
    }
    return res.json(blogs);
  } catch (error) {
    console.log(error);
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { _id } = req.params;
    const blog = await Blog.findById(_id)
      .populate("author")
      .populate("comments.user", "-password");

    if (!blog) {
      return res.json({ message: "Blog Not Found" });
    }
    return res.json({ message: "Blog Fetched", blog });
  } catch (error) {
    console.log(error);
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user;
    const blog = await Blog.findById(blogId);
    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter((id) => {
        id.toString() !== userId.toString();
      });
    } else {
      blog.likes.push(userId);
    }
    await blog.save();
    return res.json({ message: "blog likes updated" });
  } catch (error) {
    console.log(error);
  }
};

export const writeComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user;
    const { text } = req.body;
    if (!text) {
      return res.json({ message: "Comment content required" });
    }

    const blog = await Blog.findById(blogId);

    console.log(blog);

    blog.comments.push({ text, user: userId });
    await blog.save();
    return res.json({ message: "Comment Added" });
  } catch (error) {
    console.log(error);
  }
};
