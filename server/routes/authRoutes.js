import express from "express";
import { login, logout, register, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword, updateUser,changePassword } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware//uploadMiddleware.js"; // Import the upload middleware for handling file uploads

const authRouter = express.Router();

// Register route: Added the upload middleware to handle profile photo upload
authRouter.post('/register', upload.single('profilePhoto'), register);

// Login route
authRouter.post('/login', login);

// Logout route
authRouter.post('/logout', logout);

// Send OTP for verification route: Protected by userAuth middleware
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);

// Verify account route: Protected by userAuth middleware
authRouter.post('/verify-account', userAuth, verifyEmail);

// Check if the user is authenticated route: Protected by userAuth middleware
authRouter.get('/is-auth', userAuth, isAuthenticated);

// Send OTP for password reset route
authRouter.post('/send-reset-otp', sendResetOtp);

// Reset password route
authRouter.post('/reset-password', resetPassword);

// Profile update route: Allows users to update their profile, including the profile photo
authRouter.put('/update-user', userAuth, upload.single('profilePhoto'), updateUser);

authRouter.post('/change-password', userAuth, changePassword);

export default authRouter;
