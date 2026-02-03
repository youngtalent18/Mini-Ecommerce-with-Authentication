import mongoose from "mongoose";

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
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;