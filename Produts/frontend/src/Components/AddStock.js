import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../StyleCss/ProductAdd.css';

const AddStock = () => {
  const [stock, setStock] = useState({
    ProductName: '',
    Brand: '',
    Qty: '',
    Description: '',
    Img: null,
    Price: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {const { name, value, type } = event.target;
  setStock((prevStock) => ({
      ...prevStock,
      [name]: type === "file" ? event.target.files[0] : value
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
  
    if (!stock.Img) {
      alert("Please select an image.");
      return;
    }
  
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(stock.Img.type)) {
      alert("Invalid image format. Please upload a JPG or PNG image.");
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", stock.ProductName);
    formData.append("Brand", stock.Brand);
    formData.append("Qty", stock.Qty);
    formData.append("Description", stock.Description);
    formData.append("Img", stock.Img);
    formData.append("Price", stock.Price);

    try {
      const response = await axios.post('http://localhost:4000/ProductsRoot/Stock', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Stock added:', response.data);
      alert("Stock added successfully!");

      setStock({ ProductName: '', Brand: '', Qty: '', Description: '', Img: null, Price: '' });
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || "Error adding stock!");
    }
  };

  return (
    <div className="add-stock-container">
      <form id="stockForm" onSubmit={handleSubmit}>
        <h1 className="text-center">Add Stock</h1>

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
            <input type="file" name="Img" onChange={handleChange} required className="stock-form-txt" />
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
          <button type="submit" className="stock-form-btn">Add Stock</button>
        </center>
      </form>
    </div>
  );
};

export default AddStock;
