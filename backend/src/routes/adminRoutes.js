import express from 'express';
import { adminProtect, protect } from '../middlewares/authMiddlewares.js';
import { postExercises } from '../controllers/adminController.js';

const router = express.Router();

router.post("/post-exercises", protect,adminProtect,postExercises);

export default router;
