import express from "express"
import { protectRoute,getCheckoutSuccess } from "../middleware/protectRoute.js"

const router = express.Router();
router.post("/create-checkout-session" ,protectRoute, createCheckoutSession);
router.post("/checkout-success" ,protectRoute, getCheckoutSuccess);
export default router;