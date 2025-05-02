import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    ProductName: { type: String, required: true },
    Brand: { type: String, required: true },
    Qty: { type: Number, required: true, min: 0 },
    Description: { type: String },
    Img: { type: String, required: true }, 
    Price: { type: Number, required: true, min: 0 },
   
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
