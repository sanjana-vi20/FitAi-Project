import express from 'express'
import { groqChatBot } from '../controllers/serviceController.js';
import { protect } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post("/chatbotresponse", protect,groqChatBot);

export default router;