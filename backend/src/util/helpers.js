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

export async function buildDayObject(
  dayName,
  volume,
  intensity,
  goalOne,
  exLevel,
  actLevel,
  strategy,
) {
  const exArray = await Exercise.find({
    activityLevel: actLevel,
    experienceLevel: exLevel,
    activities: goalOne,
  }).limit(volume.exercisesPerDay);

  return {
    day: dayName,
    focus: strategy.progressionFocus,
    intensityLevel: intensity,
    type: strategy.PrimaryType,
    exercises: exArray,
  };
}

export async function makeWorkoutPlan(
  goalOne,
  exLevel,
  actLevel,
) {
  const strategy = goalStrategy[goalOne] || goalStrategy["stay-fit"];

  const workoutDays = getWorkoutDays(actLevel);

  const volume = getVolume(exLevel);

  const weekTemplate = [];

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
      }
      continue;
    } else if (workoutDays === 5) {
      if (i === 2) {
        weekTemplate.push({
          day: dayNames[i],
          focus: "Rest",
          intensityLevel: 0,
          type: "rest",
          exercises: [],
        });
      }
      continue;
    }

    weekTemplate.push(
      buildDayObject(
        dayNames[i],
        volume,
        intensity,
        goalOne,
        exLevel,
        actLevel,
        strategy,
      ),
    );

    i++;
  }

  // Add rest days

  weekTemplate.push({
    day: dayNames[6],
    focus: "Rest",
    intensityLevel: 0,
    type: "rest",
    exercises: [],
  });
}
