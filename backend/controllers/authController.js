import User from "../models/userModel.js"
import bcrypt from "bcryptjs";

export async function signup(req,res){
    try{
        const { email, password, username} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex){
            return res.status(400).json({error: "Invalid email format"});
        }

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({error: "Username already taken"});
        }

        const existingEmail = await User.findOne({email});

        if(existingEmail){
            return res.status(400).json({error: "Email already taken"});
        }

        if(password < 6){
            return res.status(400).json({error: "Password must be 6 or more"});
        }

        const salt = await bcrypt.genSalt(10);

        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashPass});

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
        }else{
            res.status(404).json({
                error: "Invalid user data"
            });
        }

        return res.status(201).json({
            password: hashPass,
            email,
            username
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