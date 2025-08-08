import { User } from '../models/user.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false
      });
    }
    // Explicitly select password for comparison
    const user = await User.findOne({ email }).select('+password');
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
    // Remove password from user object before sending
    const { password: pwd, ...userData } = user.toObject();
    return res.status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 3600000, sameSite: "lax" })
      .json({
        message: `Welcome back ${user.fullName}`,
        user: userData,
        token,
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
    .clearCookie("token", { httpOnly: true, sameSite: "lax" })
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
      return res.status(400).json({
        message: "Full name, email, and password are required",
        success: false
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "This email is already used",
        success: false
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 16);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword
    });
    // Remove password from user object before sending
    const { password: pwd, ...userData } = newUser.toObject();
    return res.status(201).json({
      message: "Account created successfully",
      user: userData,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get current user profile (for navbar/profile)
export const getProfile = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dsvrhbdtjsfhghdjfvfhfdv");
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error("Error in getProfile:", err); // Log the error
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dsvrhbdtjsfhghdjfvfhfdv");
    const { fullName, email,avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { fullName, email,avatar },
      { new: true, runValidators: true }
    ).select('-password');
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dsvrhbdtjsfhghdjfvfhfdv");
    await User.findByIdAndDelete(decoded.id);
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};