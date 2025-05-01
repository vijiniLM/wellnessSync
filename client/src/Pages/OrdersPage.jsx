// src/Pages/OrdersPage.jsx
import React, { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { CartContext } from "../Context/CartContext";

const OrdersPage = () => {
  const { orders, fetchOrders, cancelOrder } = useContext(CartContext);
  
  // Retrieve userId either from your user context or localStorage.
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId, fetchOrders]);

  // Function to compute total price for an order.
  const calculateOrderTotal = (orderItems) =>
    orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-center text-lg">No orders found.</p>
        ) : (
          orders.map((order) => {
            const orderDate = new Date(order.createdAt);
            const orderDateString = orderDate.toLocaleString();
            const now = new Date();
            const diffMinutes = (now - orderDate) / (1000 * 60);
            // Can cancel if order is pending and within 10 minutes of creation
            const canCancel = order.status === "pending" && diffMinutes <= 10;
            const orderTotal = calculateOrderTotal(order.order);

            return (
              <div
                key={order._id}
                className="mb-8 border border-gray-200 rounded-lg p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <div>
                    <p className="text-lg font-semibold">
                      Order Date: {orderDateString}
                    </p>
                    <p className="text-gray-600">
                      Status: <span className="capitalize">{order.status}</span>
                    </p>
                    <p className="text-gray-600">Address: {order.address}</p>
                    <p className="text-gray-600">Phone: {order.phoneNumber}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <p className="text-xl font-bold">Total: ${orderTotal}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {order.order.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center border border-gray-100 p-4 rounded shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-500">Category: {item.category}</p>
                        <p className="text-gray-500">Price: ${item.price}</p>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Cancel Order Button - only show if order is pending */}
                {order.status === "pending" && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => cancelOrder(order._id)}
                      disabled={!canCancel}
                      className={`px-4 py-2 rounded ${
                        canCancel
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      title={!canCancel ? "Cancellation window expired" : "Cancel Order"}
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default OrdersPage;
