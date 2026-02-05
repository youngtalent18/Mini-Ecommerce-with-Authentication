import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const protectRoute = async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;

        if(!accessToken){
            return res.status(400).json({
                error: "Unauthorized access, token unavailable"
            })
        }

        try{
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        
            if(!decoded) return res.status(400).json({
                error: "Invalid token"
            })

            const user = await User.findById(decoded.userId).select("-password");

            if(!user){
                return res.status(404).json({
                    error: "User not found"
                })
            }
            req.user = user;
            next();

        }catch(error){
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({error: "Unauthorized - access token expired"});
            }
            throw error;
        }
    }catch(error){
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const adminRoute = async (req, res, next) => {
    try{
        if(req.user && req.user.role === "admin"){
            next();
        }else{
            return res.status(403).json({
                error: "Access denied, Admin only"
            });
        };
    }catch(error){
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export default protectRoute;