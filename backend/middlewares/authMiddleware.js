import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.error("No token provided");
      return res
        .status(401)
        .json({ message: "Not authorized, no token", success: false }); // More specific message
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        console.error("Invalid token - JWT verification failed");
        return res.status(401).json({ message: "Invalid token", success: false });
      }
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        console.error("User not found with provided token");
        return res.status(404).json({ message: "User not found", success: false });
      }

      req.user = user;
      next();
    } catch (jwtErr) {
      // Catch JWT verification errors (e.g., expired, invalid signature)
      console.error("JWT Verification Error:", jwtErr.message);
      return res.status(401).json({ message: "Invalid token", success: false });
    }
  } catch (err) {
    console.error("Authentication error:", err);
    return res
      .status(500)
      .json({ message: "Server error during authentication", success: false });
  }
};
