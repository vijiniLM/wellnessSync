// src/Context/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  /**
   * postOrder posts the order to the backend.
   *
   * It expects an object with:
   * - userId: the user's id,
   * - address: shipping address,
   * - phoneNumber: contact number,
   * - orderItems: an array of food objects (each should have name, category, image, price, quantity).
   *
   * The order items are appended as a JSON string.
   *
   * If your createOrder controller accepts file uploads, you could also append file(s)
   * to the FormData (in this demo we assume images are already URLs).
   */
  const postOrder = async ({userId, address, phoneNumber, orderItems }) => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("address", address);
      formData.append("phoneNumber", phoneNumber);
      formData.append("order", JSON.stringify(orderItems));

      // Post the formData to the backend
      const response = await axios.post(`${backendUrl}/api/orders`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // Optionally clear the cart after order is placed:
        clearCart();
        return response.data.order;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/`, { userId });
      if (response.data.success) {
        setOrders(response.data.orders);
        //console.log(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/orders/${orderId}/cancel`);
      if (response.data.success) {
        toast.success(response.data.message);
        // Optionally update orders state by filtering out the cancelled order.
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        postOrder,
        fetchOrders,
        orders,
        cancelOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
