import express from "express";
import { userLogin, userLogout, userRegister } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);

export default router;
