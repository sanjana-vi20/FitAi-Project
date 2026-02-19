import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum:["user", "admin"],
    required: true,
    default:"user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
