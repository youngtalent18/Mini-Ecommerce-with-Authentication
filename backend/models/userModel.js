import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"], 
        trim: true,
        lowercase: true,
        unique: true
    },
    password: { 
        type: String,
        minLength: [6, "password must be six or more"],
        required: [true, "Password is required"]
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, { timestamps: true });

//hashing the password before saving
//I need go more into this 😢
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }catch(error){
        throw new Error("Error hashing the password");
    }
})

userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password,this.password);
}

const User = mongoose.model('User', userSchema);
export default User;