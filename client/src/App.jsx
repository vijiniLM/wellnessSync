import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import EmailVerify from "./Pages/EmailVerify";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile";
import FoodList from "./Pages/FoodList";
import CartPage from "./Pages/CartPage";
import OrdersPage from "./Pages/OrdersPage";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/foodList" element={<FoodList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </div>
  );
};

export default App;
