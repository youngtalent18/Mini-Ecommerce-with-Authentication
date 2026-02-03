import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(400).json({
                error: "Unauthorized access, token unavailable"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decode) return res.status(400).json({
            error: "Invalid token"
        })

        const user = await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }
        req.user = user;
        next();

    }catch(error){
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export default protectRoute;