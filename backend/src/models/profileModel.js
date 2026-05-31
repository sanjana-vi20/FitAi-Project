import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  referenceUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
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
    type: Number,
    required: true,
    default: 0,
  },
  maintainanceCal:{
    type:Number
  },
  target: {
    height: {
      type: Number,
      required() {
        return this.parent().activities === "height-gain";
      },
      default: 0,
    },
    weight: {
      type: Number,
      required() {
        return this.parent().activities === "weight-gain" || this.parent().activities === "weight-loss";
      },
      default: 0,
    },
    calories:{
      type:Number,
    }
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
