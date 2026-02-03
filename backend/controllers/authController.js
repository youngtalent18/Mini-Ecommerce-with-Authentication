import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export async function signup(req,res){
    try{
        const { email, password, name} = req.body;

        const existingEmail = await User.findOne({email});

        if(existingEmail){
            return res.status(400).json({error: "user already exists"});
        }

        const newUser = new User({ name, email, password});

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
        }else{
            res.status(404).json({
                error: "Invalid user data"
            });
        }

        return res.status(201).json({
            newUser: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            },
            message: "user created successfully"
        });

    }catch(error){
        console.log("Error in user controller", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export async function login(req,res){
    try{
        const { username, password} = req.body;

        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    }catch(error){
        console.log("Error in user controller", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export async function logout(_,res){
    try{
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        console.log("Error in user controller", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export async function getMe(req, res) {
    try{
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json(user)
    }catch(error){
        console.log("Error in getMe controller", error)
        res.status(500).json({
            error: "Internal server error"
        });
    }
}