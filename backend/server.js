import express from "express"
import cors from "cors"
import dotenv from "dotenv";

import userRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js"

import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 6060

app.use("/api/auth", userRoute);
app.use("/api/products", productRoute);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    });
});