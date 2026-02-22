import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseType: {
    type: String,
    required: true,
  },
  activities: {
    type: [String],
    required: true,
  },
  experienceLevel: {
    type: [String],
    required: true,
  },
  activityLevel: {
    type: [String],
    required: true,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
