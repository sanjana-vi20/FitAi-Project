import mongoose from "mongoose";

const dietPlanWeekSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  weekNumber: Number,
  goal: String,

  planMeta: {
    maintenanceCalories: Number,
    adjustmentValue: Number,
    finalCalorieTarget: Number,
    macroSplit: {
      proteinPercent: Number,
      carbsPercent: Number,
      fatPercent: Number,
    },
  },

  dailyTargets: {
    calories: Number,
    proteinGrams: Number,
    carbsGrams: Number,
    fatGrams: Number,
  },

  days: [
    {
      day: String,
      planned: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
      },
    },
  ],

  status: {
    type: String,
    default: "active",
  },
});

const DietPlanWeek = mongoose.model("DietPlanWeek", dietPlanWeekSchema);

export default DietPlanWeek;
