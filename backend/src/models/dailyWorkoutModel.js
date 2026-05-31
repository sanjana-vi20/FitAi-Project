import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
  setNumber: {
    type: Number,
    required: true,
  },
  repsCompleted: {
    type: Number,
    default: 0,
  },
  weightUsed: {
    type: Number,
    default: 0,
  },
  durationSec: {
    type: Number,
    default: 0,
  },
  restTakenSec: {
    type: Number,
    default: 0,
  },
});

const exerciseLogSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  sets: [setSchema],
});

const workoutDetailsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  planned: {
    type: Boolean,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  completionPercentage: {
    type: Number,
    required: true,
  },
  durationMinutes: {
    type: Number,
    default: 0,
  },
  intensityLevel: {
    type: Number,
    min: 0,
    max: 5,
  },
  exercisesDone: {
    type: Number,
    default: 0,
  },
  totalExercises: {
    type: Number,
    default: 0,
  },
  exerciseLogs: [exerciseLogSchema],
});

const dietDetailsSchema = new mongoose.Schema({
  estimatedCaloriesConsumed: {
    type: Number,
    default: 0,
  },
  followed: {
    type: Boolean,
    default: false,
  },
  proteinHit: {
    type: Boolean,
    default: false,
  },
});

const recoveryDetailsSchema = new mongoose.Schema({
  energyLevel: {
    type: String,
    enum: ["low", "normal", "high"],
    default: "normal",
  },
  muscleSoreness: {
    type: Number,
    min: 1,
    max: 10,
  },
  sleepHours: {
    type: Number,
    default: 0,
  },
});

const workoutSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutPlan",
      required: true,
    },
    dayIndex: {
      type: Number,
      required: true,
    },

    workoutDetails: workoutDetailsSchema,
    dietDetails: dietDetailsSchema,
    recoveryDetails: recoveryDetailsSchema,

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const WorkoutSession = mongoose.model("WorkoutSession", workoutSessionSchema);

export default WorkoutSession;