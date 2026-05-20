import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(400)
        .json({ message: "Login to Access", success: false });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "Login to Access", success: false });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode._id;
    next();
  } catch (error) {
    console.log(error);
  }
};
