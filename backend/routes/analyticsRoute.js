import express from "express";
import  { protectRoute, adminRoute } from "../middleware/protectRoute.js";
import { getAnalysis } from "../controllers/analytics.js";

const router = express.Router();  

router.get("/", protectRoute, adminRoute, getAnalysis);

export default router;