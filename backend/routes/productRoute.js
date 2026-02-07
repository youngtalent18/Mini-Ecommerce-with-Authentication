import express from "express"
import { createProduct, 
        deleteProduct, 
        toggleFeaturedStatus, 
        getRecommendations,
        getCategoryProducts, 
        getAllProducts, 
        getFeaturedProducts } from "../controllers/productController.js";
import {protectRoute, adminRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getCategoryProducts);
router.get("/recommendations", getRecommendations);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedStatus);
router.post("/:id", protectRoute, adminRoute, deleteProduct);

export default router;