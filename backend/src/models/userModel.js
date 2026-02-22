import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // referenceDiet: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Diet",
    //   required: true,
    // },
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
    weight: {
      type: String,
      required: true,
      default: "N/A",
    },
    activityLevel: {
      type: String,
      enum: ["light", "moderate", "extreme", "N/A"],
      required: true,
      default: "N/A",
    },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "N/A"],
      required: true,
      default: "N/A",
    },
    activities: {
      type: String,
      enum: [
        "weight-loss",
        "muscle-gain",
        "height-gain",
        "weight-gain",
        "stay-fit",
      ],
      default: "stay-fit",
      required: true,
    },
    bmi: {
      type: String,
      default: "N/A",
    },
    maintenanceCalories: {
      type: String,
      default: "N/A",
    },
    targetCalories: {
      type: String,
      required: true,
      default: "N/A",
    },
    target: {
      height: {
        type: Number,
        required: function () {
          return this.parent().activities === "height-gain";
        },
        default: 0,
      },
      weight: {
        type: Number,
        required: function () {
          return (
            this.parent().activities === "weight-gain" ||
            this.parent().activities === "weight-loss"
          );
        },
        default: 0,
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
