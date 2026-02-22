import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    //profile

    age: {
      type: String,
      required: true,
      default: "N/A",
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", "N/A"],
      required: true,
      default: "N/A",
    },
    height: {
      type: String,
      required: true,
      default: "N/A",
    },
    width: {
      type: String,
      required: true,
      default: "N/A",
    },
    activityLevel: {
      type: String,
      required: true,
      default: "N/A",
    },
    experienceLevel: {
      type: String,
      required: true,
      default: "N/A",
    },
    goal: {
      type: String,
      required: true,
      default: "N/A",
    },
    bmi: {
      type: String,
      required: true,
      default: "N/A",
    },
    maintenanceCalories: {
      type: String,
      required: true,
      default: "N/A",
    },
    targetCalories: {
      type: String,
      required: true,
      default: "N/A",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
