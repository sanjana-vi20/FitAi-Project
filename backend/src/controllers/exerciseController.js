import WorkoutSession from "../models/dailyWorkoutModel.js";
import Plan from "../models/planSchema.js";
import { averageArray, makeWorkoutPlan } from "../util/helpers.js";

export const getWorkouts = async (req, res, next) => {
  // post plan

  try {
    const activities = await req.user.profile[0].activities;
    const experienceLevel = await req.user.profile[0].experienceLevel;
    const activityLevel = await req.user.profile[0].activityLevel;

    if (!activities || !experienceLevel || !activityLevel) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const weekTemplate = await makeWorkoutPlan(
      activities,
      experienceLevel,
      activityLevel,
    );

    console.log("Workout Plan : ", weekTemplate);

    const totalWorkoutDays = weekTemplate.filter(
      (d) => d.type !== "rest",
    ).length;

    const totalRestDays = weekTemplate.filter((d) => d.type === "rest").length;

    const totalExercises = weekTemplate.reduce(
      (acc, day) => acc + day.exercises.length,
      0,
    );

    const averageIntensity = (
      weekTemplate.reduce((acc, day) => acc + day.intensityLevel, 0) /
      weekTemplate.length
    ).toFixed(2);

    const startDate = new Date();

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 6);

    const plan = await Plan.create({
      user: req.user._id, // assuming auth middleware
      goal: activities,
      experienceLevel,
      start: startDate,
      end: endDate,
      activityLevel,
      weekNumber: 1,
      weekTemplate,
      analytics: {
        totalWorkoutDays,
        totalRestDays,
        averageIntensity,
        totalExercises,
      },
      generationMeta: {
        progressionType: "initial-week",
        createdFrom: "auto-engine",
      },
    });

    console.log("Plan : ", plan);

    //later depenency on weekdays
    // const workoutPlan = await Plan.findOne({ user: req.user._id }).sort({
    //   createdAt: -1,
    // });

    // console.log("workout Plan :", workoutPlan);

    res.status(200).json({ message: "Plan Successfully Fetched" });
  } catch (error) {
    next(error);
  }
};

export const getWorkoutMain = async (req, res, next) => {
  try {
    const { userId } = req.user._id;

    const dataa = await Plan.findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log(dataa);

    res.status(200).json({ message: "Workout Fetched", data: dataa });
  } catch (error) {
    next(error);
  }
};

export const workoutLogs = async (req, res, next) => {
  try {
    const { id } = req.params;

    const logs = await WorkoutSession.find({ userId: id });
    res.status(200).json({ message: "Activity Fetched", data: logs });
  } catch (error) {
    next(error);
  }
};

export const patchCompletedChange = async (req, res, next) => {
  try {
    const { obj, id } = req.params;

    const current = await Plan.findById(id);

    if (!current) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const dayIndex = current.weekTemplate.findIndex((item) => item.day === obj);

    if (dayIndex === -1) {
      return res.status(404).json({ message: "Day not found" });
    }

    // Update value
    current.weekTemplate[dayIndex].isCompleted = true;

    await current.save();

    res.status(200).json({
      message: "Day marked as completed",
      data: current,
    });
  } catch (error) {
    next(error);
  }
};

export const getLimitedData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    console.log(userId);

    const dataa = await WorkoutSession.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3);

    console.log("Limited Data", dataa);

    const cpa = averageArray(
      dataa.map((item) => item.workoutDetails.completionPercentage),
    ).toFixed(2);
    const il = averageArray(
      dataa.map((item) => item.workoutDetails.intensityLevel),
    ).toFixed(2);
    const ecc = averageArray(
      dataa.map((item) => item.dietDetails.estimatedCaloriesConsumed),
    ).toFixed(2);
    const ed = dataa.map((item) => item.workoutDetails.exercisesDone);
    const te = dataa.map((item) => item.workoutDetails.totalExercises);
    const ph = averageArray(
      dataa.map((item) => item.dietDetails.proteinHit),
    ).toFixed(2);
    const el = dataa.map((item) => item.recoveryDetails.energyLevel);
    const ms = averageArray(
      dataa.map((item) => item.recoveryDetails.muscleSoreness),
    ).toFixed(2);
    const sh = averageArray(
      dataa.map((item) => item.recoveryDetails.sleepHours),
    ).toFixed(2);

    const habit =
      100 *
      (
        ed.reduce((acc, curr) => acc + curr, 0) /
        te.reduce((acc, curr) => acc + curr, 0)
      ).toFixed(2);

    const val = { cpa, il, ecc, ph, el, ms, sh, habit };

    console.log("Value : ", val);

    res
      .status(200)
      .json({ message: "Limited data fetched Successfully", data: val });
  } catch (error) {
    next(error);
  }
};
