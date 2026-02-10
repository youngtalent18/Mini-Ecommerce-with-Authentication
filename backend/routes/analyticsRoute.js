import express from "express";
import  { protectRoute, adminRoute } from "../middleware/protectRoute";

const router = express.Router();  

router.get("/", protectRoute, adminRoute, getAnalysis);

export default router;