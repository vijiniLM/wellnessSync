import express from "express";
import 'dotenv/config';
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
connectDB();

const allowedOrigins = ['http://localhost:5173','http://localhost:3000']; // Add your frontend origin
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API endpoints
app.get("/", (req, res) => {
    res.send("Server is running properly");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
