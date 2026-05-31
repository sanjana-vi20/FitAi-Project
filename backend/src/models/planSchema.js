import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    start: {
      type: Date,
    },

    end: {
      type: Date,
    },

    goal: String,
    experienceLevel: String,
    activityLevel: String,

    weekNumber: Number,

    weekTemplate: {
      type: Array,
      required: true,
    },

    // 🔥 Auto Calculated Fields
    analytics: {
      totalWorkoutDays: Number,
      totalRestDays: Number,
      averageIntensity: Number,
      totalExercises: Number,
    },

    generationMeta: {
      progressionType: String,
      createdFrom: String, // "auto-engine"
    },

    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true },
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
