import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import '../StyleCss/Slots.css';
import { Link } from 'react-router-dom';

const WhishList = () => {
    const [Shop, setShop] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/AddtoCart/getcart`)
            .then(result => setShop(result.data))
            .catch(err => console.log(err));
    }, []);  

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/AddtoCart/deleteAddToCart/${id}`)
            .then(() => {
                setShop(Shop.filter(stock => stock._id !== id)); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div>


<header className="navbar">
    <div className="navbar-left">
        <span className="page-name">Fitness e-Stock</span>
    </div>
    <div className="navbar-right">
      <Link to='/Shop'> <button className="nav-button">Shop</button></Link> 
      
    </div>
</header>


           
            <div className="slot-container">
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
                            <button className='bt' onClick={() => handleDelete(stock._id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            {Shop.length > 0 && (
                <div style={{ 
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000
                }}>
                    <button 
                        className="proceed-button" 
                        style={{
                            padding: '10px 30px',
                            fontSize: '18px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        Proceed
                    </button>
                </div>
            )}
        </div>
    );
};

export default WhishList;
