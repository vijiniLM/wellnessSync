import express from "express";
import {
  createOrder,
  cancelOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/uploadMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/", userAuth,upload.single('orderPhoto'), createOrder);
orderRouter.get("/", userAuth, getOrdersByUserId);
orderRouter.get("/all", getAllOrders);
orderRouter.post("/:id/cancel", userAuth, cancelOrder);
orderRouter.put("/update-status", updateOrderStatus);

export default orderRouter;
