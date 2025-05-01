// src/pages/FoodList.jsx
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import treadmill from "../assets/tredmil.avif";
import dumbbell from "../assets/dumbbell.webp";
import yogaMat from "../assets/yogamat.jpeg";
import stationaryBike from "../assets/stationarybike.avif";
import bench from "../assets/bench.jpeg";
import kettlebell from "../assets/kettlebell.jpg";
import resistanceBands from "../assets/resistancebands.webp";

// Example array of food items
const gymItems = [
  {
    id: 1,
    name: "Treadmill",
    category: "Cardio",
    image: treadmill, // import treadmill from '...'
    price: 750,
  },
  {
    id: 2,
    name: "Dumbbell Set (5-50lbs)",
    category: "Strength",
    image: dumbbell, // import dumbbell from '...'
    price: 120,
  },
  {
    id: 3,
    name: "Yoga Mat",
    category: "Accessories",
    image: yogaMat, // import yogaMat from '...'
    price: 25,
  },
  {
    id: 4,
    name: "Stationary Bike",
    category: "Cardio",
    image: stationaryBike, // import stationaryBike from '...'
    price: 650,
  },
  {
    id: 5,
    name: "Adjustable Bench",
    category: "Strength",
    image: bench, // import bench from '...'
    price: 200,
  },
  {
    id: 6,
    name: "Kettlebell Set",
    category: "Strength",
    image: kettlebell, // import kettlebell from '...'
    price: 90,
  },
  {
    id: 7,
    name: "Resistance Bands",
    category: "Accessories",
    image: resistanceBands, // import resistanceBands from '...'
    price: 30,
  },
];


const FoodList = () => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Added to cart!");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gymItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.category}</p>
                <p className="mt-2 font-bold">${item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  <FaCartPlus className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodList;
