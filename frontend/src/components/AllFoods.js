import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllFoods.css';

export default function AllFoods() {
  const [foods, setFoods] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [subscriptionDuration, setSubscriptionDuration] = useState('');
  const [foodDetails, setFoodDetails] = useState(null);
  const [subscribedPackages, setSubscribedPackages] = useState({});
  const [manageModalPackage, setManageModalPackage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 👉 Inject Chatbase Chatbot Script on Mount
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) window.chatbase.q = [];
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });
    }

    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "FTFr1im51AhixgenP_GWM";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8070/food")
      .then(response => setFoods(response.data))
      .catch(error => console.error("Error fetching foods:", error));

    const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    const subscriptionMap = {};
    subscriptions.forEach(sub => {
      subscriptionMap[sub._id] = sub;
    });
    setSubscribedPackages(subscriptionMap);
  }, []);

  const meals = foods.filter(food => food.type === 'meal');
  const packages = foods.filter(food => food.type === 'package');

  const filteredFoods = (type) => {
    const filtered = type === 'meal' ? meals : packages;
    return filtered.filter(food =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const openDetailsModal = (foodId) => {
    axios.get(`http://localhost:8070/food/get/${foodId}`)
      .then(response => setFoodDetails(response.data))
      .catch(error => console.error("Error fetching food details:", error));
  };

  const openSubscriptionModal = (food) => {
    setSelectedPackage(food);
  };

  const confirmSubscription = () => {
    if (!subscriptionDuration) {
      alert("Please select a subscription duration.");
      return;
    }

    const durationDays = subscriptionDuration === "1 Week" ? 7 : 30;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + durationDays);

    let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    const updatedSub = { ...selectedPackage, duration: subscriptionDuration, expiresAt: expirationDate.toISOString() };
    subscriptions = subscriptions.filter(sub => sub._id !== selectedPackage._id);
    subscriptions.push(updatedSub);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

    setSubscribedPackages(prev => ({
      ...prev,
      [selectedPackage._id]: updatedSub
    }));

    alert(`${selectedPackage.name} subscribed until ${expirationDate.toDateString()}!`);
    setSelectedPackage(null);
    navigate('/payment');
  };

  const openManageModal = (food) => {
    setManageModalPackage(food);
  };

  const extendSubscription = () => {
    const current = new Date(subscribedPackages[manageModalPackage._id].expiresAt);
    current.setDate(current.getDate() + 7);
    updateSubscription(manageModalPackage._id, current);
    setManageModalPackage(null);
  };

  const changeSubscriptionDuration = (newDuration) => {
    const baseDate = new Date();
    const addedDays = newDuration === "1 Week" ? 7 : 30;
    baseDate.setDate(baseDate.getDate() + addedDays);
    updateSubscription(manageModalPackage._id, baseDate, newDuration);
    setManageModalPackage(null);
  };

  const cancelSubscription = () => {
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    subscriptions = subscriptions.filter(sub => sub._id !== manageModalPackage._id);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

    setSubscribedPackages(prev => {
      const updated = { ...prev };
      delete updated[manageModalPackage._id];
      return updated;
    });

    setManageModalPackage(null);
  };

  const updateSubscription = (id, newDate, newDuration = subscribedPackages[id].duration) => {
    let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    subscriptions = subscriptions.map(sub => {
      if (sub._id === id) {
        return { ...sub, expiresAt: newDate.toISOString(), duration: newDuration };
      }
      return sub;
    });
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    setSubscribedPackages(prev => ({
      ...prev,
      [id]: { ...prev[id], expiresAt: newDate.toISOString(), duration: newDuration }
    }));
  };

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(food);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${food.name} has been added to your cart!`);
  };

  return (
    <div className="foods-container">
      {/* Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '20px',
            border: '1px solid #ddd',
            marginRight: '10px',
            width: '200px',
          }}
        />
        <button
          onClick={() => {}}
          style={{
            backgroundColor: '#90ee90',
            color: '#1a1a1a',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#E3F8B3'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#d1faac'}
        >
          Search
        </button>
      </div>

      {/* Natural Ingredients & Compare Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', gap: '10px' }}>
        <button
          onClick={() => navigate('/order-ingredients')}
          style={{
            backgroundColor: '#90ee90',
            color: '#1a1a1a',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#77dd77'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#90ee90'}
        >
          Go natural and cook it your way 🌿
        </button>

        <button
          onClick={() => navigate('/compare-foods')}
          style={{
            backgroundColor: '#90ee90',
            color: '#1a1a1a',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#77dd77'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#90ee90'}
        >
          Compare meals, pick smarter 💡
        </button>
      </div>

      {/* Meals Section */}
      <h2>Meals</h2>
      <div className="foods-grid">
        {filteredFoods('meal').map(food => (
          <div key={food._id} className="food-card">
            <h4>{food.name}</h4>
            {food.discounts > 0 ? (
              <p>
                Price: <span style={{ textDecoration: 'line-through' }}>${food.price.toFixed(2)}</span>{' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  ${(food.price * (1 - food.discounts / 100)).toFixed(2)} ({food.discounts}% off)
                </span>
              </p>
            ) : (
              <p>Price: ${food.price.toFixed(2)}</p>
            )}
            <div className="button-group">
              <button className="view-details-button" onClick={() => openDetailsModal(food._id)}>View Details</button>
              <button className="add-to-cart-button" onClick={() => addToCart(food)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {/* Packages Section */}
      <h2>Packages</h2>
      <div className="foods-grid">
        {filteredFoods('package').map(food => {
          const sub = subscribedPackages[food._id];
          return (
            <div key={food._id} className="food-card">
              <h4>{food.name}</h4>
              {sub && (
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                  Subscription active until: {new Date(sub.expiresAt).toLocaleDateString()}
                </p>
              )}
              {food.discounts > 0 ? (
                <p>
                  Price: <span style={{ textDecoration: 'line-through' }}>${food.price.toFixed(2)}</span>{' '}
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    ${(food.price * (1 - food.discounts / 100)).toFixed(2)} ({food.discounts}% off)
                  </span>
                </p>
              ) : (
                <p>Price: ${food.price.toFixed(2)}</p>
              )}
              <div className="button-group">
                <button className="view-details-button" onClick={() => openDetailsModal(food._id)}>View Details</button>
                {!sub ? (
                  <button className="subscribe-button" onClick={() => openSubscriptionModal(food)}>Subscribe</button>
                ) : (
                  <button className="subscribe-button" onClick={() => openManageModal(food)}>Manage Subscription</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {foodDetails && (
        <div className="modal allfoods-modal">
          <div className="modal-content">
            <h3>{foodDetails.name}</h3>
            <p><strong>Type:</strong> {foodDetails.type}</p>
            <p><strong>Ingredients:</strong> {foodDetails.ingredients.join(", ")}</p>
            <p><strong>Expiry Date:</strong> {new Date(foodDetails.expiryDate).toLocaleDateString()}</p>
            {foodDetails.discounts > 0 ? (
              <p>
                <strong>Price:</strong>{' '}
                <span style={{ textDecoration: 'line-through' }}>${foodDetails.price.toFixed(2)}</span>{' '}
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  ${(foodDetails.price * (1 - foodDetails.discounts / 100)).toFixed(2)} ({foodDetails.discounts}% off)
                </span>
              </p>
            ) : (
              <p><strong>Price:</strong> ${foodDetails.price.toFixed(2)}</p>
            )}
            <p><strong>Macronutrients:</strong> Calories: {foodDetails.macronutrients.calories}, Protein: {foodDetails.macronutrients.protein}g, Carbs: {foodDetails.macronutrients.carbohydrates}g, Fats: {foodDetails.macronutrients.fats}g</p>
            <p><strong>Micronutrients:</strong> Fiber: {foodDetails.micronutrients.fiber}g, Sugar: {foodDetails.micronutrients.sugar}g, Sodium: {foodDetails.micronutrients.sodium}mg</p>
            <p><strong>Vitamins:</strong> {foodDetails.vitamins.join(", ")}</p>
            <p><strong>Minerals:</strong> {foodDetails.minerals.join(", ")}</p>
            <div className="modal-buttons">
              <button onClick={() => setFoodDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {selectedPackage && (
        <div className="modal allfoods-modal">
          <div className="modal-content">
            <h3>Subscribe to {selectedPackage.name}</h3>
            <p>Select subscription duration:</p>
            <select value={subscriptionDuration} onChange={(e) => setSubscriptionDuration(e.target.value)}>
              <option value="">-- Select Duration --</option>
              <option value="1 Week">1 Week</option>
              <option value="1 Month">1 Month</option>
            </select>
            <div className="modal-buttons">
              <button onClick={confirmSubscription}>Confirm</button>
              <button onClick={() => setSelectedPackage(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {manageModalPackage && (
        <div className="modal allfoods-modal">
          <div className="modal-content">
            <h3>Manage Subscription for {manageModalPackage.name}</h3>
            <p>What would you like to do?</p>
            <div className="modal-buttons">
              <button onClick={extendSubscription}>Extend (1 Week)</button>
              <button onClick={() => changeSubscriptionDuration("1 Week")}>Change to 1 Week</button>
              <button onClick={() => changeSubscriptionDuration("1 Month")}>Change to 1 Month</button>
              <button onClick={cancelSubscription}>Cancel Subscription</button>
              <button onClick={() => setManageModalPackage(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
