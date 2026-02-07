import express from "express"
import { addToCart,getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cartController";
import {protectRoute} from "../middleware/protectRoute";

const router = express.Router();

router.post("/",protectRoute, getCartProducts);
router.get("/",protectRoute, addToCart);
router.delete("/",protectRoute, removeAllFromCart);
router.put("/:id",protectRoute, updateQuantity);
export default router;