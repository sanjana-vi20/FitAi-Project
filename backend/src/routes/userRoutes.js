import express from 'express'
import { protect } from '../middlewares/authMiddlewares.js';
import { getWorkouts } from '../controllers/exerciseController.js';

const router = express.Router();

router.get("/get-workouts", protect, getWorkouts);

export default router;