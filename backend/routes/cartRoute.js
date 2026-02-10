import express from "express"
import { addToCart,getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cartController.js";
import {protectRoute} from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/",protectRoute, getCartProducts);
router.get("/",protectRoute, addToCart);
router.delete("/",protectRoute, removeAllFromCart);
router.put("/:id",protectRoute, updateQuantity);
export default router;