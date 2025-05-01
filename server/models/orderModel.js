// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  order: [orderItemSchema],
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "making","Waiting for deliver person pickup", "picked", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
