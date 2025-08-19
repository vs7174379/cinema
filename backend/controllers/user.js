import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const tokenData = { id: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });

    user.password = undefined; // remove password before sending

    return res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Logout Controller
export const logOut = async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: true,       // must match login
      sameSite: "None",   // must match login
      path: "/",          // always include for safety
    })
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
            return res.status(400).json({ // Use 400 for bad request
                message: "Full name, email, and password are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ // Use 409 for conflict (email already exists)
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

        const tokenData = { id: newUser._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET || "dsvrhbdtjsfhghdjfvfhfdv", { expiresIn: "1h" });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            token // Include token in the response
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ // Use 500 for server errors
            message: "Registration failed",
            success: false
        });
    }
};

// Update User Controller
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from route parameters
        const { fullName, avatar } = req.body;

        if (!fullName || !avatar) {
            return res.status(400).json({ // Use 400 for bad request
                message: "Full name and avatar are required for update",
                success: false
            });
        }

        // Find the user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { fullName, avatar },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ // Use 404 if user not found
                message: "User not found",
                success: false
            });
        }

        // Respond with the updated user
        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
            success: true
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ // Use 500 for server errors
            message: "Failed to update user",
            success: false
        });
    }
};

// Get User Controller
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // Assuming authMiddleware is used and populates req.user

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User profile retrieved successfully",
      user,
      success: true
    });
  } catch (error) {
    console.error("Error getting user profile:", error);
    return res.status(500).json({
      message: "Failed to get user profile",
      success: false
    });
  }
};


export const addToWatchList = async (req, res) => {
  try {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({ message: "Movie ID and User ID are required", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Check if movie already exists in watchlist
    const alreadyInList = user.watchlist.some(
      (item) => item.movieId.toString() === movieId
    );

    if (alreadyInList) {
      return res.status(409).json({ message: "Movie already in watchlist", success: false });
    }

    // Add movie with timestamp
    user.watchlist.push({ movieId });
    await user.save();

    return res.status(200).json({
      message: "Movie added to watchlist successfully",
      success: true,
      watchlist: user.watchlist,
    });

  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return res.status(500).json({ message: "Failed to add movie to watchlist", success: false });
  }
};
export const removeFromWatchList = async (req, res) => {
  try {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({ message: "Movie ID and User ID are required", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.watchlist = user.watchlist.filter(
      (item) => item.movieId.toString() !== movieId
    );

    await user.save();

    return res.status(200).json({
      message: "Movie removed from watchlist successfully",
      success: true,
      watchlist: user.watchlist,
    });

  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return res.status(500).json({ message: "Failed to remove movie from watchlist", success: false });
  }
};

export const getWatchList = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming authMiddleware sets req.user

    const user = await User.findById(userId).populate("watchlist.movieId");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Watchlist retrieved successfully",
      watchlist: user.watchlist,
      success: true
    });

  } catch (error) {
    console.error("Error getting watchlist:", error);
    return res.status(500).json({ message: "Failed to get watchlist", success: false });
  }
};



export const likeMovie = async (req, res) => {
  try {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({ message: "Movie ID and User ID are required", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Check if already liked
    const alreadyLiked = user.likes.some(
      (item) => item.movieId.toString() === movieId
    );

    if (alreadyLiked) {
      return res.status(409).json({ message: "Movie already liked", success: false });
    }

    // Add like
    user.likes.push({ movieId });
    await user.save();

    return res.status(200).json({
      message: "Movie liked successfully",
      success: true,
      likes: user.likes,
    });

  } catch (error) {
    console.error("Error liking movie:", error);
    return res.status(500).json({ message: "Failed to like movie", success: false });
  }
};
export const unlikeMovie = async (req, res) => {
  try {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({ message: "Movie ID and User ID are required", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    user.likes = user.likes.filter(
      (item) => item.movieId.toString() !== movieId
    );

    await user.save();

    return res.status(200).json({
      message: "Movie unliked successfully",
      success: true,
      likes: user.likes,
    });

  } catch (error) {
    console.error("Error unliking movie:", error);
    return res.status(500).json({ message: "Failed to unlike movie", success: false });
  }
};

export const addToContinueWatching = async (req, res) => {
  try {
    const { movieId, userId,title,poster, progress } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({ message: "Movie ID and User ID are required", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Check if movie already exists in continueWatching
    const existing = user.continueWatching.find(
      (item) => item.movieId.toString() === movieId
    );

    if (existing) {
      // Update progress & timestamp
      existing.progress = progress;
      existing.updatedAt = Date.now();
    } else {
      // Add new entry
      user.continueWatching.push({ movieId, progress, title, poster });
    }

    await user.save();

    return res.status(200).json({
      message: "Continue Watching updated successfully",
      success: true,
      continueWatching: user.continueWatching,
    });

  } catch (error) {
    console.error("Error adding to continue watching:", error);
    return res.status(500).json({ message: "Failed to update continue watching", success: false });
  }
};


import Razorpay from "razorpay";
import crypto from "crypto";


// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_CY6Vuttr0BdTnS',
  key_secret: 'tLMzot2l96TYBE9cMkPullIx',
});

// 👉 Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", plan, userId } = req.body;

    if (!amount || !plan || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency,
      receipt: `${userId}-${Date.now()}`,
    });

    res.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 👉 Verify Payment + Update Subscription
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, userId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", 'tLMzot2l96TYBE9cMkPullIx')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Payment verified → Update subscription
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month plan

    await User.findByIdAndUpdate(userId, {
      subscription: {
        plan,
        active: true,
        startDate,
        expiryDate,
      },
    });

    res.json({ success: true, message: "Subscription activated" });
  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


