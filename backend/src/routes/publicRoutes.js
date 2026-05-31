import express from 'express';
import { GetAllPost } from '../controllers/publicController.js';

const router = express.Router();

router.get("/getAllPost" , GetAllPost);

export default router;