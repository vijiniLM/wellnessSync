// controllers/orderController.js
import Order from "../models/orderModel.js";
import { getCoordinatesNominatim, getDistanceInKm } from "../utils/locationUtils.js";

const HOTEL_LAT = 6.914682;
const HOTEL_LNG = 79.973329;

// POST /api/orders
export const createOrder = async (req, res) => {
  // Expecting the following fields:
  // - userId, address, phoneNumber (from req.body)
  // - order (a JSON string representing an array of order items)
  // - For each order item, there may be an attached image file via req.files

  const { userId, address, phoneNumber } = req.body;

  if (!userId || !address || !phoneNumber || !req.body.order) {
    return res.status(400).json({
      success: false,
      message: "userId, order, address, and phoneNumber are required.",
    });
  }

  try {
    // Parse the order JSON sent in req.body.order
    const userLocation = await getCoordinatesNominatim(address);
    console.log(userLocation);
    const distance = getDistanceInKm(
      HOTEL_LAT,
      HOTEL_LNG,
      userLocation.lat,
      userLocation.lon
    );
    console.log(distance);
    let orderItems = JSON.parse(req.body.order); // should be an array of objects
    if (distance > 10) {
      return res.status(400).json({
        success: false,
        message: "Sorry, we only deliver within 10km range of the gym.",
        distance: `${distance.toFixed(2)} km`,
      });
    }
    // If image files are attached, update the corresponding order item's image property.
    // This example assumes the files are in the same order as the order items.
    if (req.files && req.files.length > 0) {
      orderItems = orderItems.map((item, index) => {
        if (req.files[index]) {
          // Replace the image property with the Cloudinary URL provided by Multer.
          item.image = req.files[index].path;
        }
        return item;
      });
    }

    // Create the order using the data
    const newOrder = new Order({
      userId,
      order: orderItems,
      address,
      phoneNumber,
      status: "Waiting for deliver person pickup", // initial status
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/orderController.js (continuing in the same file)
export const cancelOrder = async (req, res) => {
  // Assume the order id is provided as a URL parameter (e.g., /api/orders/:id/cancel)
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Check if the order was placed within the last 10 minutes.
    const now = new Date();
    const orderCreatedAt = order.createdAt;
    const diffMinutes = (now - orderCreatedAt) / (1000 * 60);

    if (diffMinutes > 10) {
      return res.status(400).json({
        success: false,
        message:
          "Cancellation window expired. You can only cancel within the first 10 minutes.",
      });
    }

    // Only allow cancellation if the order is still pending.
    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Order cannot be cancelled because it has already been processed.",
      });
    }

    order.status = "cancelled";
    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find orders that match the provided userId.
    // You can also sort by createdAt if needed (e.g., descending order).
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
