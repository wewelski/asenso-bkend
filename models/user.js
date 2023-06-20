import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide your first and last name"]
  },
  email: {
    type: String,
    required: [true, "Email must be provided"]
  },
  phone: {
    type: String,
    required: [true, "Phone number must be provided"]
  },
  password: {
    type: String,
    required: [true, "You must type a password"]
  }
})

module.exports = mongoose.model("User", userSchema);