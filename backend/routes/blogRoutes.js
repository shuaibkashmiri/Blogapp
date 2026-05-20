import express from "express";
import {
  createBlog,
  getAllblogs,
  getSingleBlog,
  myBlogs,
  toggleLike,
  writeComment,
} from "../controllers/blogController.js";
import upload from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/create", isAuthenticated, upload.single("image"), createBlog);
router.get("/all", getAllblogs);
router.get("/my", isAuthenticated, myBlogs);
router.get("/:_id", getSingleBlog);
router.put("/like/:blogId", isAuthenticated, toggleLike);
router.put("/comment/:blogId", isAuthenticated, writeComment);
export default router;
