import express from "express";
import { userLogin, userRegister } from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
