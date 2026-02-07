import Product from "../models/productModel.js";
import {redis} from "../config/redis.js";
import cloudinary from "../lib/utils/cloudinary.js";

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

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try{
                await cloudinary.uploader.destroy(`products/${publicId}`);
            }catch(error){
                console.log("Error deleting image from Cloudinary", error);
            }
        }

        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product deleted successfully" });

    }catch (error) {
        console.log("Error in deleteProduct controller", error);
        return res.status(500).json({ error: "Failed to delete product" });
    }
}
       
export const getRecommendations = async (_,res) => {
    try{
        const recommendations = await Product.aggregate([
            { 
                $sample: { size: 5 }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1,
                    category: 1
                }
            }
        ]);
        return res.json(recommendations);   
    }catch(error){
        console.log("Error in getRecommendations controller", error);
        return res.status(500).json({ error: "Failed to fetch recommendations" });
    }
}

export const getCategoryProducts = async (req,res) => {
    try{
        const { category } = req.params;
        const categoryProducts = await Product.find({ category }).sort({ createdAt: -1 });
        res.json(categoryProducts);
    }catch(error){
        console.log("Error in getCategoryProducts controller", error);
        return res.status(500).json({ error: "Failed to fetch category products" });
    }
}

export const toggleFeaturedStatus = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            return res.json(updatedProduct);
        }else{
            return res.status(404).json({error: "Product not found"});
        }
    }catch(error){
        console.log("Error in toggleFeaturedStatus controller", error);
        return res.status(500).json({ error: "Failed to toggle featured status" });
    }
}
// Helper function to update the featured products cache
async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts), { "EX": 60 * 60 });
    } catch (error) {
        console.log("Error updating featured products cache", error);
    }
}