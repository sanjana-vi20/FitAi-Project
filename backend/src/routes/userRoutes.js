import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import {
  getWorkouts,
  getWorkoutMain,
  workoutLogs,
  patchCompletedChange,
  getLimitedData,
} from "../controllers/exerciseController.js";
import multer from "multer";
import {
  userProfileController,
  getDietPreference,
  saveWorkoutSession,
  UserPostDetails,
  ToggleLike,
  DeletePost,
  generateDietPlanController,
} from "../controllers/userController.js";

const router = express.Router();
const upload = multer();

router.get("/get-workouts", protect, getWorkouts);

router.get("/get-workouts-main", protect, getWorkoutMain);

router.post("/workout-log", protect, saveWorkoutSession);
router.post("/diet-preference", protect, getDietPreference);
router.put("/user-profile/:id", protect, userProfileController);
router.get("/get-diet-chart/:id", protect, generateDietPlanController);
router.post("/user-post", protect, upload.single("image"), UserPostDetails);
router.put("/like-post/:postId", protect, ToggleLike);
router.delete("/delete-post/:postId", protect, DeletePost);

router.get("/all-workout/:id", protect, workoutLogs);

//patch

router.patch("/patch-completed/:obj/:id", protect, patchCompletedChange);

router.get("/limited-data", protect, getLimitedData);

export default router;
