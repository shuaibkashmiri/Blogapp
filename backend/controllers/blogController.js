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
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      blog.likes.push(userId);
    }
    await blog.save();
    return res.json({ message: "Blog likes updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not update likes" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user;
    const { title, content } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    if (blog.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this blog" });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      blog.image = result.secure_url;
    }

    await blog.save();
    return res.json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not update blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    if (blog.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    return res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Could not delete blog" });
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
