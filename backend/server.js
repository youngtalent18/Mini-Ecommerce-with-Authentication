import express from "express"
import cors from "cors"
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 6060

app.use("/api/user", userRoute);

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    });
});