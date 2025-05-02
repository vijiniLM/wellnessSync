import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../StyleCss/ProductAdd.css';

const UpdateStock = () => {
  const { id } = useParams(); // Get stock ID from URL params
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    ProductName: '',
    Brand: '',
    Qty: '',
    Description: '',
    Img: null,
    Price: ''
  });

  useEffect(() => {
    console.log("Stock ID:", id);  // Log the ID to make sure it's correct
  
    axios.get(`http://localhost:4000/ProductsRoot/getstock/${id}`)
      .then(response => {
        setStock({
          ProductName: response.data.ProductName,
          Brand: response.data.Brand,
          Qty: response.data.Qty,
          Description: response.data.Description,
          Img: null,
          Price: response.data.Price
        });
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
        if (error.response) {
          console.error("API Response Error:", error.response.data);
        }
        alert("Failed to load stock details.");
      });
  }, [id]);
  

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setStock((prevStock) => ({
      ...prevStock,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stock.ProductName.trim() || !stock.Brand.trim() || !stock.Description.trim()) {
      alert("Please fill in all the text fields.");
      return;
    }

    if (!stock.Qty || isNaN(stock.Qty) || stock.Qty <= 0) {
      alert("Quantity must be a positive number.");
      return;
    }

    if (!stock.Price || isNaN(stock.Price) || stock.Price <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", stock.ProductName);
    formData.append("Brand", stock.Brand);
    formData.append("Qty", stock.Qty);
    formData.append("Description", stock.Description);
    if (stock.Img) formData.append("Img", stock.Img); // Only append if updated
    formData.append("Price", stock.Price);

    try {
      await axios.put(`http://localhost:4000/ProductsRoot/updatestock/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert("Stock updated successfully!");
      navigate('/');
    } catch (error) {
      console.error('Error updating stock:', error);
      alert(error.response?.data?.message || "Error updating stock!");
    }
  };

  return (
    <div className="add-stock-container">
      <form id="stockForm" onSubmit={handleSubmit}>
        <h1 className="text-center">Update Stock</h1>

        <div className="set">
          <div className="inputcontainer">
            <label>Product Name</label>
            <input
              type="text"
              name="ProductName"
              placeholder="Product Name"
              value={stock.ProductName}
              onChange={handleChange}
              required
              className="stock-form-txt"
            />
          </div>

          <div className="inputcontainer">
            <label>Brand</label>
            <input
              type="text"
              name="Brand"
              placeholder="Brand"
              value={stock.Brand}
              onChange={handleChange}
              required
              className="stock-form-txt"
            />
          </div>

          <div className="inputcontainer">
            <label>Quantity</label>
            <input
              type="number"
              name="Qty"
              placeholder="Quantity"
              value={stock.Qty}
              onChange={handleChange}
              required
              className="stock-form-txt"
            />
          </div>

          <div className="inputcontainer">
            <label>Description</label>
            <input
              type="text"
              name="Description"
              placeholder="Description"
              value={stock.Description}
              onChange={handleChange}
              required
              className="stock-form-txt"
            />
          </div>

          <div className="inputcontainer">
            <label>Product Image</label>
            <input type="file" name="Img" onChange={handleChange} readOnly className="stock-form-txt" />
          </div>

          <div className="inputcontainer">
            <label>Price</label>
            <input
              type="number"
              name="Price"
              placeholder="Price"
              value={stock.Price}
              onChange={handleChange}
              required
              className="stock-form-txt"
            />
          </div>
        </div>

        <center>
          <button type="submit" className="stock-form-btn">Update Stock</button>
        </center>
      </form>
    </div>
  );
};

export default UpdateStock;
