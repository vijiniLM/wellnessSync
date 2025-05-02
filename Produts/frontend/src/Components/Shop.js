import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../StyleCss/Slots.css';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
    const [Shop, setShop] = useState([]);

    const [stock, setStock] = useState({
        ProductName: '',
        Brand: '',
        Qty: '',
        Description: '',
        Img: null,
        Price: ''
    });

    // Fetch products on page load
    useEffect(() => {
        axios.get(`http://localhost:4000/ProductsRoot/getstock`)
            .then(result => setShop(result.data))
            .catch(err => console.log(err));
    }, []);

    // Add product to cart
    const handleAddToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:4000/AddtoCart/AddToCart', product);
            alert(`${product.ProductName} has been added to the cart!`);
        } catch (err) {
            console.error(err);
            alert('Failed to add product to cart');
        }
    };

    const navigate = useNavigate();


    return (
        <div>
            <header className="navbar">
    <div className="navbar-left">
        <span className="page-name">Fitness e-Stock</span>
    </div>
    <div className="navbar-right">
      <Link to='/whishList'> <button className="nav-button">My cart</button></Link> 
      
    </div>
</header>


         <center>  <div className="slot-container">
                {Shop.map((stock, index) => (
                    <div className="slot" key={index}>
                        <div className="profile-icon">
                            <img src={`http://localhost:4000${stock.Img}`} alt={stock.ProductName} />
                        </div>
                        <p><strong>Name:</strong> {stock.ProductName}</p>
                        <p><strong>Brand:</strong> {stock.Brand}</p>
                        <p><strong>Price:</strong> ${stock.Price}</p>
                        <p><strong>Stock:</strong> {stock.Qty}</p>
                        <p><strong>Description:</strong> {stock.Description}</p>

                        <div className="product-actions">
                            <button className='add-to-cart' onClick={() => handleAddToCart(stock)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div></center> 
        </div>
    );
};

export default Shop;
