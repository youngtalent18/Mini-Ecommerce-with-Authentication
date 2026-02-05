import User from "../models/userModel.js"
import jwt from "jsonwebtoken";

import { generateTokens, setCookies } from "../lib/utils/generateToken.js";
import { redis } from "../config/redis.js"

const storeRefreshToken = async (userId,refreshToken) => {
    await redis.set(`refresh_token: ${userId}`, refreshToken, {"Ex": 7*24*60*60}); // 7 days expiration
}

export async function signup(req,res){
    try{
        const { email, password, name} = req.body;

        const existingEmail = await User.findOne({email});

        if(existingEmail){
            return res.status(400).json({error: "user already exists"});
        }

        const user = await User.create({ name, email, password});

        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }catch(error){
        console.log("Error in user controller", error);
        return res.status(500).json({error: error.message});
    }
}

export async function login(req,res){
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(user && await user.comparePassword(password)){
            const { accessToken, refreshToken } = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);
            res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }else{
            return  res.status(401).json({error: "Invalid email or password"});
        }

    }catch(error){
        console.log("Error in login controller", error);
        return res.status(500).json({error: "Internal server error"});
    }
}
export async function logout(req,res){
    try{
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
            await redis.del(`refresh_token: ${decoded.userId}`);
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({message: "logged out successfully"});
    }catch(error){
        console.log("Error in logout controller", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export async function refresh_token(req,res){
    try{
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(401).json({error: "No refresh token provided"});
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

        const storedToken = await redis.get(`refresh_token: ${decoded.userId}`);
        if(storedToken !== refreshToken){
            return res.status(403).json({error: "Invalid refresh token"});
        }

        const {accessToken} = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN, {expiresIn: "15m"});

        res.cookie("accessToken", accessToken, {
            sameSite: "strict",
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 15*60*1000,
        });

        res.status(200).json({message: "Access token refreshed"});

    }catch(error){
        console.log("Error in refresh token controller", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

// export async function getProfile(req,res){
//     try{
//         const user = await User.findById(req.user._id);

//         if(!user) return res.status(404).json({message: "User not found"});

//     }catch(error){
//         console.log("Error in get profile controller", error);
//         return res.status(500).json({error: "Internal server error"});
//     }
// }