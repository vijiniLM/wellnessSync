// src/pages/CartPage.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    postOrder,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Modal and stepper state for payment
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Shipping details state
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    mobile: "",
  });

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleNext = () => {
    if (activeStep === 1) {
      if (!shippingDetails.address || !shippingDetails.mobile) {
        toast.error("Please fill in your shipping details.");
        return;
      }
    }
    if (activeStep === 2) {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        toast.error("Please fill in your card details.");
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePaymentConfirm = () => {
    // Here you could trigger a payment API call. For now, we simulate a success.
    postOrder({
      userId: localStorage.getItem("userId"),
      address: shippingDetails.address,
      phoneNumber: shippingDetails.mobile,
      orderItems: cartItems,
    })
    //toast.success("Payment successful!");
    setIsPayModalOpen(false);
    setActiveStep(1);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <div className="text-right">
              <h2 className="text-2xl font-bold">Total: ${totalPrice}</h2>
              <button
                onClick={() => setIsPayModalOpen(true)}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Pay
              </button>
              <button
                onClick={clearCart}
                className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {activeStep === 1
                ? "Delivery Details"
                : activeStep === 2
                ? "Card Details"
                : "Confirmation"}
            </h2>

            {/* Step 1: Shipping Details */}
            {activeStep === 1 && (
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingDetails.address}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      address: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mb-4"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={shippingDetails.mobile}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      mobile: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
            )}

            {/* Step 2: Card Details */}
            {activeStep === 2 && (
              <div>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cardNumber: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded mb-4"
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-4"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
            )}

            {/* Step 3: Confirmation */}
            {activeStep === 3 && (
              <div className="text-center">
                <p className="mb-4">
                  Please review your delivery details and the total payment:
                </p>
                <p>
                  <strong>Address:</strong> {shippingDetails.address}
                </p>
                <p>
                  <strong>Mobile:</strong> {shippingDetails.mobile}
                </p>
                <p>
                  <strong>Total Payment:</strong> ${totalPrice}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  if (activeStep === 1) {
                    setIsPayModalOpen(false);
                    setActiveStep(1);
                  } else {
                    handleBack();
                  }
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                {activeStep === 1 ? "Cancel" : "Back"}
              </button>
              {activeStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handlePaymentConfirm}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Confirm Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
