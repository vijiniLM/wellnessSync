import React, { useState, useEffect } from 'react';
import './FoodCart.css';

export default function FoodCart() {
  const [cart, setCart] = useState([]);

  // Fetch the cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Fetched cart from localStorage:", storedCart);
    if (storedCart.length > 0) {
      setCart(storedCart);
    }
  }, []);

  // Sync cart to localStorage when it changes
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Cart is being updated:", cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleRemoveFromCart = (foodId) => {
    console.log("Cart before removal:", cart);
    const index = cart.findIndex(item => item._id === foodId);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    console.log("Cart after removal:", cart);
  };

  const calculateDiscountedPrice = (food) => {
    if (food.discounts && food.discounts > 0) {
      return food.price * (1 - food.discounts / 100);
    }
    return food.price;
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((food, index) => {
              const discountedPrice = calculateDiscountedPrice(food);
              return (
                <div key={index} className="cart-item">
                  <div className="cart-item-details">
                    <h4>{food.name}</h4>
                    {food.discounts && food.discounts > 0 ? (
                      <p>
                        Price: <span style={{ textDecoration: 'line-through' }}>${food.price.toFixed(2)}</span>{' '}
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          ${discountedPrice.toFixed(2)} ({food.discounts}% off)
                        </span>
                      </p>
                    ) : (
                      <p>Price: ${food.price.toFixed(2)}</p>
                    )}
                  </div>
                  <button onClick={() => handleRemoveFromCart(food._id)}>Remove</button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>
              <center>
                Total: $
                {cart
                  .reduce((total, food) => total + calculateDiscountedPrice(food), 0)
                  .toFixed(2)}
              </center>
            </h3>
          </div>

          <button className="checkout-button">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}
