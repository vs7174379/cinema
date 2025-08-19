import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password by default
    },
    avatar: {
      type: String,
      default: "", // URL to profile image
    },
    subscription: {
      plan: { type: String, default: "free" }, // free, premium, etc.
      validTill: { type: Date },
    },
    likes: [
      {
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        likedAt: { type: Date, default: Date.now },
      }
    ]
    ,
    watchlist: [
      {
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        addedAt: { type: Date, default: Date.now },
      }
    ],
    continueWatching: [
      {
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        progress: { type: Number, default: 0 }, // percentage watched
        title: { type: String, default: "" },
        poster: { type: String, default: "" },
        updatedAt: { type: Date, default: Date.now },
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);