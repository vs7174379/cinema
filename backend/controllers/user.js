import { User } from '../models/user.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false
      });
    }
    const tokenData = { id: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET || "dsvrhbdtjsfhghdjfvfhfdv", { expiresIn: "1h" });
    return res.status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 3600000 })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Logout Controller
export const logOut = async (req, res) => {
  return res.status(200)
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .json({
      message: "Logout successful",
      success: true
    });
};

// Register Controller
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "This email is already used",
        success: false
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 16);
    await User.create({
      fullName,
      email,
      password: hashedPassword
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};