import React,{useEffect,useState}from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../StyleCss/ProductTable.css';


const Product = () => {

    const [Stock,setStock] =useState([]);       
    useEffect(() => {   
        axios.get(`http://localhost:4000/ProductsRoot/getstock`)
          .then((result) => {
            console.log("Fetched Data:", result.data);
            setStock(result.data);
          })
          .catch((err) => console.log("Error fetching stock:", err));
      }, []);
      

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/ProductsRoot/deletestock/${id}`)
            .then(() => {
                setStock(Stock.filter(Stock => Stock._id !== id)); 
            })
            .catch(err => console.log(err));
    };

    return (
         <div className='tab'>
        <div >

<header className="navbar">
    <div className="navbar-left">
        <span className="page-name">My Page</span>
    </div>
    <div className="navbar-right">
      <Link to='/AddStock'> <button className="nav-button">Add</button></Link> 
      <Link to='/Shop'> <button className="nav-button">Shop</button></Link> 
      
    </div>
</header>
              <center>

                
        <h1> Stocks</h1>
             </center>
            <table border="1">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Qty</th>
                        <th>Description</th>
                        <th>Img</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

              
                    {Stock.map((Stock, index) => (
                        <tr key={index}>
                            <td>{Stock.ProductName}</td>
                            <td>{Stock.Brand}</td>
                            <td>{Stock.Qty}</td>
                            <td>{Stock.Description}</td>
                            <td>{Stock.Img}</td>
                            <td>{Stock.Price}</td>
    <td>       
    <Link to={`/updatestock/${Stock._id}`}>
       <button>Update</button>
    </Link>
    <button className='bt'  onClick={() => handleDelete(Stock._id)}>Delete</button>
    </td>
 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div> 
    );
}

export default Product