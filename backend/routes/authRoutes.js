import express from "express";
import {
  deleteUser,
  getUserDetail,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/usercontroller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", isAuthenticated, getUserDetail);
router.patch("/update", isAuthenticated, updateUser);
router.delete("/delete", isAuthenticated, deleteUser);

// frontend Auth

router.get("/cl-auth", isAuthenticated, (req, res) => {
  res.status(200).json({ success: true });
});

export default router;
