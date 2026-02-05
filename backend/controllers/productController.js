import Product from "../models/productModel.js";
import {redis} from "../config/redis.js";
import {cloudinary} from "../lib/utils/cloudinary.js";

export const getAllProducts = async (req,res) => {
    try{
        const products = await Product.find({}).sort({createdAt: -1});
        return res.status(201).json(products);
    }catch(error){
        console.log("Error in getAllProducts controller");
        return res.status(404).json({error: "products not found"});
    }
}

export const getFeaturedProducts = async(req, res) => {
    try{
        let featuredProducts = await redis.get("featured_products");
        if(featuredProducts){
            return res.json(JSON.parse(featuredProducts));
        }

        featuredProducts = await Product.find({isFeatured:true}).lean(); // Fetch plain JS objects

        if(!featuredProducts || featuredProducts.length === 0){
            return res.status(404).json({error: "No featured products found"});
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts), { "EX": 60*60 } ); // I am caching the result in Redis for 1 hour
        return res.json(featuredProducts);
    }catch(error){
        console.log("Error in getFeaturedProducts controller", error);
        return res.status(500).json({error: "Failed to fetch featured products"});
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, image } = req.body;
        let cloudinaryResult = null;

        if (image) {
            cloudinaryResult = await cloudinary.uploader.upload(image, {
                folder: "products",
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResult?.secure_url ? cloudinaryResult.secure_url : "",
            category,
        });
        return res.status(201).json(newProduct);

    } catch (error) {
        console.log("Error in createProduct controller", error);
        return res.status(500).json({ error: "Failed to create product" });
    }
}