import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  date:{
    type:Date,
    required:true
  },
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
  duration: {
    type: Number,
  },
  reps: {
    type: String,
  },
  sets: {
    type: Number,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
