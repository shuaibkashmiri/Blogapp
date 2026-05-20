import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import {
  getUserDetail,
  loginUser,
  registerUser,
} from "./controllers/userController.js";
import { isAuthenticated } from "./middlewares/auth.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
dotenv.config();

const app = express();
// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/user", authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Is up And Running on port ${port}`);
});

connectDB();
