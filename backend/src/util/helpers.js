import Exercise from "../models/exerciseModel.js";

export function getWorkoutDays(activityLevel) {
  if (activityLevel === "light") return 4;
  if (activityLevel === "moderate") return 5;
  if (activityLevel === "extreme") return 6;
}

export function getVolume(experienceLevel) {
  if (experienceLevel === "beginner") {
    return { sets: 2, exercisesPerDay: 4, intensityStart: 1 };
  }
  if (experienceLevel === "intermediate") {
    return { sets: 3, exercisesPerDay: 5, intensityStart: 2 };
  }
}

export const goalStrategy = {
  "weight-loss": {
    cardioDays: 3,
    strengthDays: 2,
    mobilityDays: 1,
    restDays: 1,
    primaryType: "conditioning",
    progressionFocus: "increase-cardio-volume",
  },

  "muscle-gain": {
    cardioDays: 1,
    strengthDays: 4,
    mobilityDays: 1,
    restDays: 1,
    primaryType: "hypertrophy",
    progressionFocus: "increase-load",
  },

  "weight-gain": {
    cardioDays: 0,
    strengthDays: 4,
    mobilityDays: 1,
    restDays: 2,
    primaryType: "strength",
    progressionFocus: "increase-load-and-volume",
  },

  "stay-fit": {
    cardioDays: 2,
    strengthDays: 2,
    mobilityDays: 1,
    restDays: 2,
    primaryType: "balanced",
    progressionFocus: "maintain-consistency",
  },

  "height-gain": {
    cardioDays: 0,
    strengthDays: 1,
    mobilityDays: 4,
    restDays: 2,
    primaryType: "mobility",
    progressionFocus: "increase-flexibility-range",
  },
};

const date = new Date();

export async function buildDayObject(
  dayName,
  volume,
  intensity,
  goalOne,
  exLevel,
  actLevel,
  strategy,
  startDate, // User ki start date (e.g., new Date())
  index,      // 0 for Day 1, 1 for Day 2, etc.
  completedData
) {
  // Logic: Aaj ki date + (index + 1) = Agle consecutive din
  const assignedDate = new Date(startDate);
  assignedDate.setDate(assignedDate.getDate() + index + 1);

  const exArray = await Exercise.aggregate([
    {
      $match: {
        activityLevel: actLevel,
        experienceLevel: exLevel,
        activities: goalOne,
      },
    },
    { $sample: { size: volume.exercisesPerDay } },
  ]);

  return {
    day: dayName,
    isCompleted:completedData,
    date: assignedDate, // Har din ki apni unique consecutive date
    focus: strategy.progressionFocus,
    intensityLevel: intensity,
    type: strategy.primaryType,
    exercises: exArray,
  };
}

export async function makeWorkoutPlan(goalOne, exLevel, actLevel) {
  const strategy = goalStrategy[goalOne] || goalStrategy["stay-fit"];

  const workoutDays = getWorkoutDays(actLevel);

  const volume = getVolume(exLevel);

  const weekTemplate = [];

  console.log(
    "Check 2 inside make workout plan : ",
    strategy,
    workoutDays,
    volume,
  );

  const dayNames = ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"];

  let intensity = volume.intensityStart;

  for (let i = 0; i < 6; i++) {
    if (workoutDays === 4) {
      if (i === 2 || i === 5) {
        weekTemplate.push({
          day: dayNames[i],
          focus: "Rest",
          intensityLevel: 0,
          type: "rest",
          exercises: [],
        });
        continue;
      }
    } else if (workoutDays === 5) {
      if (i === 2) {
        weekTemplate.push({
          day: dayNames[i],
          focus: "Rest",
          intensityLevel: 0,
          type: "rest",
          exercises: [],
        });
        continue;
      }
    }

    weekTemplate.push(
      await buildDayObject(
        dayNames[i],
        volume,
        intensity,
        goalOne,
        exLevel,
        actLevel,
        strategy,
        date,
        i,
        false,
      ),
    );
  }

  // Add rest days

  weekTemplate.push({
    day: dayNames[6],
    focus: "Rest",
    intensityLevel: 0,
    type: "rest",
    exercises: [],
  });

  return weekTemplate;
}

export const calculateMaintainanceCalories = async (
  gender,
  height,
  weight,
  age,
  activityLevel,
) => {
  let bmr = 0;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  switch (activityLevel) {
    case "light":
      return bmr * 1.375;
    case "moderate":
      return bmr * 1.55;
    case "extreme":
      return bmr * 1.725;

    default:
      return bmr * 1.2;
  }
};

export const calculateTargetCalories = async (maintaincals, activities) => {
  switch (activities) {
    case "height-gain":
      return maintaincals + maintaincals * 0.01;
    case "weight-loss":
      return maintaincals - 500;
    case "weight-gain":
      return maintaincals + 500;
    case "muscle-gain":
      return maintaincals + 300;
    case "stay-fit":
      return maintaincals;

    default:
      break;
  }
};

// Diet Plan ------------------------------------------------------------------

const adjustmentMap = {
  deficit: -400,
  surplus: 400,
};

const macroTemplates = {
  "weight-loss": { protein: 40, carbs: 30, fat: 30 },
  "muscle-gain": { protein: 30, carbs: 50, fat: 20 },
  "weight-gain": { protein: 25, carbs: 55, fat: 20 },
  "height-gain": { protein: 35, carbs: 45, fat: 20 },
  "stay-fit": { protein: 30, carbs: 40, fat: 30 },
};

function getMealDistribution(mealFrequency, heavyMealTiming) {
  if (mealFrequency === 4) {
    switch (heavyMealTiming) {
      case "mid-day-meal":
        return [0.22, 0.35, 0.21, 0.22]; // Lunch heavy
      case "dinner":
        return [0.22, 0.21, 0.22, 0.35];
      case "breakfast":
        return [0.35, 0.22, 0.21, 0.22];
      default:
        return [0.25, 0.25, 0.25, 0.25];
    }
  }

  if (mealFrequency === 3) {
    return [0.3, 0.4, 0.3];
  }

  if (mealFrequency === 5) {
    return [0.2, 0.25, 0.2, 0.15, 0.2];
  }

  return [1]; // fallback
}

function getMealTypes(mealFrequency) {
  if (mealFrequency === 3) return ["Breakfast", "Lunch", "Dinner"];

  if (mealFrequency === 4)
    return ["Breakfast", "Mid-Day-Meal", "Evening-Snack", "Dinner"];

  if (mealFrequency === 5)
    return ["Breakfast", "Morning-Snack", "Lunch", "Evening-Snack", "Dinner"];

  return ["Meal"];
}

export async function macrosCalculationEngine(
  preference,
  goal,
  target,
  maintainCalorie,
) {
  // 1️⃣ Adjust Calories
  const adjustmentValue = adjustmentMap[preference?.deficitOrSurplusLevel] || 0;
  const finalCalories = Number(maintainCalorie) + Number(adjustmentValue);

  // 2️⃣ Select Macro Template
  const selectedMacro = macroTemplates[goal];

  console.log("Goal received:", goal);
  console.log("Selected Template:", selectedMacro);

  // 3️⃣ Convert % → kcal
  const proteinKcal = (finalCalories * Number(selectedMacro?.protein)) / 100;
  const carbsKcal = (finalCalories * Number(selectedMacro?.carbs)) / 100;
  const fatKcal = (finalCalories * Number(selectedMacro?.fat)) / 100;

  // 4️⃣ Convert kcal → grams
  const proteinGrams = proteinKcal / 4;
  const carbsGrams = carbsKcal / 4;
  const fatGrams = fatKcal / 9;

  // 5️⃣ Meal Distribution %
  const mealDistribution = getMealDistribution(
    Number(preference?.mealFrequency),
    preference?.heavyMealTiming,
  );

  const mealTypes = getMealTypes(Number(preference?.mealFrequency));

  // 6️⃣ Generate Meals
  const meals = mealDistribution.map((percent, index) => {
    const mealCalories = Number(finalCalories) * Number(percent);

    return {
      mealType: mealTypes[index],
      calories: Math.round(mealCalories),
      protein: Math.round(
        (mealCalories * Number(selectedMacro?.protein)) / 100 / 4,
      ),
      carbs: Math.round(
        (mealCalories * Number(selectedMacro?.carbs)) / 100 / 4,
      ),
      fat: Math.round((mealCalories * Number(selectedMacro?.fat)) / 100 / 9),
    };
  });

  return {
    finalCalories: Math.round(Number(finalCalories)),
    dailyMacros: {
      protein: Math.round(Number(proteinGrams)),
      carbs: Math.round(Number(carbsGrams)),
      fat: Math.round(Number(fatGrams)),
    },
    meals,
  };
}


// -------------------------------------------------------

export function averageArray(arr) {
  if (!arr.length) return 0; // empty array safety
  
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  return sum / arr.length;
}