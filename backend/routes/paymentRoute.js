import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"
import { createCheckoutSession, getCheckoutSuccess } from "../controllers/paymentController.js";

const router = express.Router();
router.post("/create-checkout-session" ,protectRoute, createCheckoutSession);
router.post("/checkout-success" ,protectRoute, getCheckoutSuccess);
export default router;