import User from "../models/userModel.js"
import jwt from "jsonwebtoken";

import { generateTokens, setCookies } from "../lib/utils/generateToken.js";
import { redis } from "../config/redis.js"
import e from "express";

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

        const { accessToken, refreshToken } = generateTokens(user._id, res);
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