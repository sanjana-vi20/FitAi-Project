import User from "../models/userModel.js";
import Profile from "../models/profileModel.js";
import {
  calculateMaintainanceCalories,
  calculateTargetCalories,
} from "../util/helpers.js";
import { macrosCalculationEngine } from "../util/helpers.js";
import Diet from "../models/dietModel.js";
import Plan from "../models/planSchema.js";
import WorkoutSession from "../models/dailyWorkoutModel.js";
import Post from "../models/postModel.js";
import cloudinary from "../config/cloudinary.js";
import DietPlanWeek from "../models/dietPlanWeekSchema.js";

export const userProfileController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      age,
      gender,
      height,
      weight,
      activityLevel,
      experienceLevel,
      activities,
      target,
    } = req.body;

    if (
      !age ||
      !gender ||
      !height ||
      !weight ||
      !activityLevel ||
      !experienceLevel ||
      !activities ||
      !target
    ) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const bodyMassIndex = weight / (height * height * 0.0001);

    const maintaincals = await calculateMaintainanceCalories(
      gender,
      height,
      weight,
      age,
      activityLevel,
    );

    const targetCals = await calculateTargetCalories(maintaincals, activities);

    const targetone = {
      height: target.height,
      weight: target.weight,
      calories: targetCals,
    };

    const profileUpdated = await Profile.create({
      referenceUser: id,
      age,
      gender,
      height,
      weight,
      activityLevel,
      experienceLevel,
      activities,
      bmi: bodyMassIndex,
      target: targetone,
      maintainanceCal: maintaincals,
    });

    const profileDetails = await User.findById(id).populate("profile");
    res
      .status(200)
      .json({ message: "Profile Setup Successfully", data: profileDetails });
  } catch (error) {
    next(error);
  }
};

export const getDietPreference = async (req, res, next) => {
  try {
    const {
      deficitOrSurplusLevel,
      mealFrequency,
      dietaryPreference,
      allergies,
      heavyMealTiming,
      flexibilityMode,
    } = req.body;

    console.log(req.body);

    if (
      !deficitOrSurplusLevel ||
      !mealFrequency ||
      !dietaryPreference ||
      !heavyMealTiming ||
      !flexibilityMode
    ) {
      const error = new Error("All Fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const currentUser = req.user;

    console.log(currentUser);

    const preference = await Diet.create({
      referenceUser: currentUser._id,
      deficitOrSurplusLevel,
      mealFrequency,
      dietaryPreference,
      allergies: allergies || ["None"],
      heavyMealTiming,
      flexibilityMode,
    });

    console.log(preference);

    res.status(201).json({ message: "Preference Added" });
  } catch (error) {
    next(error);
  }
};

export const generateDietPlanController = async (req, res, next) => {
  try {
    const currentUser = req.user;

    console.log("ID frombackend 140", currentUser._id);

    console.log(currentUser);

    const userProfile = currentUser.profile[0];

    const preference = await Diet.findOne({
      referenceUser: currentUser._id,
    }).sort({ createdAt: -1 });

    const macros = await macrosCalculationEngine(
      preference,
      userProfile.activities, // string
      userProfile.target, //object
      userProfile.maintainanceCal, // Number
    );

    // console.log("Macro 160", macros)

    const daysOfWeek = ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"];

    // Har din ke liye wahi target set kar rahe hain (Standard approach)
    const dailyDaysData = daysOfWeek.map((day) => ({
      day,
      planned: {
        calories: macros.finalCalories,
        protein: macros.dailyMacros.protein,
        carbs: macros.dailyMacros.carbs,
        fat: macros.dailyMacros.fat,
      },
    }));

    // 5️⃣ Save/Update Diet Plan in Database
    // Hum "active" plan ko update kar sakte hain ya naya bana sakte hain
    const newDietPlan = await DietPlanWeek.create({
      userId: currentUser._id,
      weekNumber: 1, // Aap isse dynamic bana sakte hain logic ke hisaab se
      goal: userProfile.activities,
      planMeta: {
        maintenanceCalories: Math.round(userProfile.maintainanceCal),
        adjustmentValue:
          macros.finalCalories - Math.round(userProfile.maintainanceCal),
        finalCalorieTarget: macros.finalCalories,
        macroSplit: {
          // Inhe calculate engine se bhi la sakte ho, abhi static values se map kar raha hoon
          proteinPercent: 30,
          carbsPercent: 50,
          fatPercent: 20,
        },
      },
      dailyTargets: {
        calories: macros.finalCalories,
        proteinGrams: macros.dailyMacros.protein,
        carbsGrams: macros.dailyMacros.carbs,
        fatGrams: macros.dailyMacros.fat,
      },
      days: dailyDaysData,
      status: "active",
    });

    // console.log("203", newDietPlan);

    const myplan = await DietPlanWeek.findOne({ userId: id }).sort({
      createdAt: -1,
    });

    // console.log("210", myplan)

    // 6️⃣ Send Final Response
    // res.status(201).json({
    //   success: true,
    //   message: "Diet Plan Generated and Saved Successfully",
    // });

    res.status(201).json({ message: "Diet Chart Loaded", data: myplan });
  } catch (error) {
    console.error("Error in generateDietPlanController:", error);
    next(error);
  }
};

export const saveWorkoutSession = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(req.body);

    const {
      planId,
      dayIndex,
      workoutDetails,
      dietDetails,
      recoveryDetails,
      notes,
    } = req.body;

    if (!planId || dayIndex === undefined || !workoutDetails) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 1️⃣ Fetch Plan
    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    // 2️⃣ Get Day Data From weekTemplate
    const dayData = plan.weekTemplate[dayIndex];

    if (!dayData) {
      return res.status(400).json({
        success: false,
        message: "Invalid day index",
      });
    }

    // 3️⃣ Backend Calculations (Never Trust Frontend)

    const totalExercises = dayData.exercises?.length || 0;

    const exercisesDone =
      workoutDetails.exerciseLogs?.filter((ex) => ex.completed).length || 0;

    const completionPercentage =
      totalExercises === 0
        ? 0
        : Math.round((exercisesDone / totalExercises) * 100);

    const intensityLevel = dayData.intensityLevel || 0;

    // 4️⃣ Normalize exerciseLogs sets according to your schema

    const normalizedExerciseLogs =
      workoutDetails.exerciseLogs?.map((exercise) => ({
        exerciseName: exercise.exerciseName,
        completed: exercise.completed,
        sets:
          exercise.sets?.map((set) => ({
            setNumber: set.setNumber,
            repsCompleted: parseInt(set.actualReps) || 0,
            weightUsed: set.weight || 0,
            durationSec: 0,
            restTakenSec: 0,
          })) || [],
      })) || [];

    // 5️⃣ Final Structured Object

    const finalWorkoutDetails = {
      date: workoutDetails.date || new Date(),
      planned: true,
      completed: exercisesDone === totalExercises,
      completionPercentage,
      durationMinutes: workoutDetails.durationMinutes || 0,
      intensityLevel,
      exercisesDone,
      totalExercises,
      exerciseLogs: normalizedExerciseLogs,
    };

    // 6️⃣ Upsert Logic (1 log per day per plan per user)

    const existingSession = await WorkoutSession.findOne({
      userId,
      planId,
      dayIndex,
    });

    if (existingSession) {
      existingSession.workoutDetails = finalWorkoutDetails;
      existingSession.dietDetails = dietDetails;
      existingSession.recoveryDetails = recoveryDetails;
      existingSession.notes = notes;

      await existingSession.save();

      return res.status(200).json({
        success: true,
        message: "Workout session updated successfully",
      });
    }

    // 7️⃣ Create New Session

    const newSession = await WorkoutSession.create({
      userId,
      planId,
      dayIndex,
      workoutDetails: finalWorkoutDetails,
      dietDetails,
      recoveryDetails,
      notes,
    });

    console.log(newSession);

    return res.status(201).json({
      success: true,
      message: "Workout session saved successfully",
      data: newSession,
    });
  } catch (error) {
    console.error("Workout Save Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving workout session",
    });
  }
};

export const UserPostDetails = async (req, res, next) => {
  try {
    const currentUser = req.user._id;

    const { caption } = req.body;
    console.log("currentUser: ", caption);

    const postImage = req.file;
    if (!postImage) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    console.log(postImage);

    const b64 = Buffer.from(postImage.buffer).toString("base64");
    console.log(b64.slice(0, 100));
    const dataURI = `data:${postImage.mimetype};base64,${b64}`;
    console.log("Data URI", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "FitAI/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Uploaded successfully :", result);
    const newPost = await Post.create({
      user: currentUser,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
      caption: caption,
    });
    // await newPost.save();
    res.status(200).json({ message: "Photo Shared", data: currentUser });
  } catch (error) {
    next(error);
  }
};

// postController.js
export const ToggleLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    // Logged in user ki ID
    console.log("PostID", postId);

    const post = await Post.findById(postId);

    console.log("post :", post);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check karein ki user ne pehle like kiya hai ya nahi
    const isLiked = post.likes.some(
      (id) => id.toString() === userId.toString(),
    );

    if (isLiked) {
      // Unlike logic: Array se user ID remove karein
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString(),
      );
    } else {
      // Like logic: Array mein user ID add karein
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: isLiked ? "Respect removed" : "Respect added",
      likes: post.likes,
    });
  } catch (error) {
    next(error);
  }
};

export const DeletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check karein ki kya ye post isi user ki hai?
    if (post.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this post" });
    }

    // 1. Cloudinary se image delete karein (using publicId)
    if (post.image.publicId) {
      await cloudinary.uploader.destroy(post.image.publicId);
    }

    // 2. Database se post delete karein
    await Post.findByIdAndDelete(postId);

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const GetAllWorkoutSessions = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await WorkoutSession.find({ userId: id });

    console.log("data : ", data);

    res.status(200).json({ message: "Fetched WorkoutSession", data: data });
  } catch (error) {
    next(error);
  }
};
