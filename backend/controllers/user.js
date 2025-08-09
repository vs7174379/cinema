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
    const tokenData = { id: newUser._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET || "dsvrhbdtjsfhghdjfvfhfdv", { expiresIn: "1h" });
    return res.status(201).json({
      message: "Account created successfully",
      user: userData,
      success: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};




export const getProfile = async (req, res) => {
  try {
    // Check if cookie exists
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: "Not authenticated", success: false });
    }

    const token = req.cookies.token;

    // Ensure JWT secret is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error", success: false });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token", success: false });
    }

    // Find user without password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Success response
    return res.json({ success: true, user });

  } catch (err) {
    console.error("Error in getProfile:", err.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated", success: false });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET not defined in environment");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let { fullName, email, avatar } = req.body;

    // Validate input
    if (!fullName || !email) {
      return res.status(400).json({ message: "Full name and email are required", success: false });
    }

    fullName = fullName.trim();
    email = email.trim();

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { fullName, email, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Update session (optional depending on your session setup)
    req.session.user = user;

    res.json({ message: "Profile updated", user, success: true });

  } catch (err) {
    console.error("Error in updateProfile:", err);

    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(400).json({ message: "Email already in use", success: false });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token", success: false });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired", success: false });
    }

    res.status(500).json({ message: "Server error", success: false });
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
    res.json({ message: "Account deleted", success: true });
  } catch (err) {
    console.error("Error in deleteAccount:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};