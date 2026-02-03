import Product from "../models/productModel.js";

export const getAllProducts = async (req,res) => {
    try{
        const products = await Product.find({}).sort({createdAt: -1});
        return res.status(201).json(products);
    }catch(error){
        console.log("Error in getAllProducts controller");
        return res.status(404).json({error: "products not found"});
    }
}