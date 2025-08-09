import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token){
        console.error("No token provided");
        return res.status(401).json({ message: "Unauthorized access", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
