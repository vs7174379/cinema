import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true // corrected 'require' to 'required'
  },
  email: {
    type: String,
    required: true, // corrected 'require' to 'required'
    unique: true    // ensure emails are unique
  },
  password: {
    type: String,
    required: true // corrected 'require' to 'required'
  }
}, { timestamps: true });

// Use ES module export
export const User = mongoose.model("User", userSchema);