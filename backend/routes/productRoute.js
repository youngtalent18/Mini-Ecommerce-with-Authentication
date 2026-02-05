import express from "express"
import { createProduct, getAllProducts, getFeaturedProducts } from "../controllers/productController.js";
import {protectRoute, adminRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/create", protectRoute, adminRoute, createProduct);

export default router;