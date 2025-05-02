import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import ProductsRoot from './Routes/ProductsRoot.js';
import AddtoCart from './Routes/AddtoCart.js'




dotenv.config();
const app = express();


const corsOptions = {
    origin: 'http://localhost:3000',  // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],  // Add 'x-auth-token' here
  };
  
  app.use(cors(corsOptions));  // Apply CORS middleware with custom options
  


app.use(express.json()); 


app.use("/ProductsRoot", ProductsRoot);
app.use('/uploads', express.static('public/uploads'));
app.use("/AddtoCart", AddtoCart);




mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error:", err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



