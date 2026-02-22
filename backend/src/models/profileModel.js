import mongoose from "mongoose";

const profile = mongoose.Schema({
  referenceDiet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diet",
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: Number,
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
  },
  activities: {
    type: String,
    enum: [
      "weight-loss",
      "muscle-gain",
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
  type: {
    type: String,
    enum: [
      "strength",
      "hypertrophy",
      "cardio",
      "endurance",
      "conditioning",
      "mobility",
      "recovery",
      "strength-cardio",
      "rest",
    ],
    required: true,
  },
  target: {
    height: {
      type: Number,
      required() {
        return this.activities === "height-gain";
      },
      default: this.height,
    },
    weight: {
      type: Number,
      required() {
        return (
          this.activities === "weight-gain" || this.activities === "weight-loss"
        );
      },
      default: this.weight,
    },
  },
});
