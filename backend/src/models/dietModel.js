import mongoose from "mongoose";

const dietSchema = mongoose.Schema({
  referenceUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  deficitOrSurplusLevel: {
    type: String,
    enum: ["deficit", "surplus"],
    default: "deficit",
    required: true,
  },
  mealFrequency: {
    type: Number,
    required: true,
  },
  dietaryPreference: {
    type: String,
    enum: ["vegetarian", "non-vegetarian", "vegan", "eggetarian"],
    required: true,
    default: "vegetarian",
  },
  allergies: {
    type: [String],
    enum: [
      "Peanuts",
      "Dairy",
      "Gluten",
      "Soy",
      "Shellfish",
      "Eggs",
      "Tree Nuts",
      "None",
    ],
    default: ["None"],
  },
  heavyMealTiming: {
    type: String,
    enum: ["breakfast", "morning-snack", "lunch", "evening-snack", "dinner", "mid-day-meal"],
  },
  flexibilityMode: {
    type: String,
    enum: ["no-free-day", "free-sunday"],
  },
});

const Diet = mongoose.model("Diet", dietSchema);

export default Diet;
