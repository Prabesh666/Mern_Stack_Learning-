import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import config from "./config/config.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";


import connectCloudinary from "./config/cloudinary.js";

import dotenv from "dotenv";



const app = express();
const upload = multer({ storage: multer.memoryStorage() });
connectDB();
connectCloudinary();

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
    res.json({
        name: config.name,
        port: config.port,
        status: "OK",
        version: config.version,
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api/orders", auth, orderRoutes);
app.use("/api/users", auth, upload.single("image"), userRoutes);
app.use("/todos", todoRoutes);

app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}...`);
});