import express from "express"
import { signup, login, refresh_token, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/logout", logout);
router.post("/login", login);
router.post("/refresh-token", refresh_token); 

export default router;