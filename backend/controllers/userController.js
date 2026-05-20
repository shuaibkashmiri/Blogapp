import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    if (!email || !fullname || !password) {
      return res.json({ message: "All Credentials Required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User Already Registered! Login Instead" });
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    await User.create({ fullname, email, password: encryptPassword });
    return res.status(201).json({ message: "User Created Successfully !" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ message: "User not found" });
    }
    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (!checkPassword) {
      return res.json({ message: "Incorrect Password" });
    }

    const token = await jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
    );
    return res
      .status(200)
      .json({
        message: "User Logged In Successfully",
        token,
        userId: existingUser._id,
      });
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetail = async (req, res) => {
  try {
    const _id = req.user;
    const user = await User.findById(_id).select("-password");
    return res.status(200).json({ message: "User Fetched", user });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const _id = req.user;
    const { email, fullname } = req.body;
    const user = await User.findById(_id);
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
      user.email = email;
    }
    if (fullname) user.fullname = fullname;
    await user.save();
    return res.status(200).json({ message: "User Updated", user });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const _id = req.user;
    const removeUser = await User.findByIdAndDelete(_id);
    if (removeUser) {
      return res.status(200).json({ message: "User Deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};
