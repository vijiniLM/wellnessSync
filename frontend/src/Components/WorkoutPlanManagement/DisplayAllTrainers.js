import React, { useState, useEffect } from "react";
import axios from "axios";
// import NavBar from "./navbar";
//import { useParams } from "react-router-dom";
import "../../style/retrivetable.css";
import "../../style/header.css";

export default function Doc() {
    const [trainer, setTrainer] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getTrainer(); 
    }, []);

    
    function getTrainer() {
        axios.get(`http://localhost:8000/trainer/view/`)
            .then((res) => {
                setTrainer(res.data.existingProject); 
            })
            .catch((err) => {
                alert(err.message); 
            });
    }

    // const deleteData = (id) => {
    //     const dataToDelete = emergency.find((e) => e._id === id);
    //     saveDataToAnotherTable(dataToDelete);

    //     axios.delete(`http://localhost:8000/Emergency/delete/${id}`)
    //         .then(() => {
    //             getEmergency();
    //         })
    //         .catch((error) => {
    //             alert(error.message);
    //         });
    // };

    // const saveDataToAnotherTable = (data) => {
    //     // Ensure that the data being sent does not contain functions
    //     const cleanData = removeFunctions(data);

    //     axios.post("http://localhost:8000/DeEmergency/save", cleanData)
    //         .then(() => {
    //             console.log("Data saved to another table successfully");
    //         })
    //         .catch((error) => {
    //             alert(error.message);
    //         });
    // };

    // const removeFunctions = (data) => {
    //     // Recursive function to remove functions from nested objects
    //     if (typeof data === "object" && data !== null) {
    //         const cleanObject = {};
    //         for (let key in data) {
    //             if (typeof data[key] !== "function") {
    //                 cleanObject[key] = removeFunctions(data[key]);
    //             }
    //         }
    //         return cleanObject;
    //     } else {
    //         return data;
    //     }
    // };

    // Function to handle the search query input change
    const searchAppointment = (full_name) => {
        setSearchQuery(full_name.target.value); 
    };

    return (
        <div className="main-container">
            <div className="body-container clearfix">
                {/* Section for heading and search */}
                <div className="order-section-one-container ">
                    <div className="order-section-one-left ">
                        <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
                            View ALL Trainers
                        </h3>
                    </div>
                    <div className="order-section-one-right">
                        {/* Search box to filter trainers based on input */}
                        <input 
                            onChange={searchAppointment} // Call searchAppointment 
                            type="search" 
                            placeholder="Search" 
                            className="search-box" 
                        />
                    </div>
                </div>

                {/* Section to display trainer cards */}
                <div className="order-section-two-container">
                    <div className="row">
                        {/* Loop through the trainers and filter based on the search query */}
                        {trainer && trainer.filter((e) =>
                            // Filter trainers by their full name (case-insensitive)
                            e.full_name.toLowerCase().includes(searchQuery.toLowerCase()) 
                        ).map((e, index) => (
                            <div key={e._id}  className="col-lg-4 col-sm-6 col-lg-6 mb-4">
                                <div className="cardtwo" style={{ border: '1px solid #ddd' }}>
                                    {/* Display profile picture */}
                                    <img src={e.profilePicture} alt={e.full_name} className="card-img-top" />
                                    <div className="card-body">
                                        {/* Display trainer details */}
                                        <h5 className="card-title">{e.full_name}</h5>
                                        <p className="card-text">
                                            <strong>Specialization:</strong> {e.specialization}
                                        </p>
                                        <p className="card-text">
                                            <strong>Email:</strong> {e.email}
                                        </p>
                                        <p className="card-text">
                                            <strong>Contact No:</strong> {e.phone_number}
                                        </p>
                                        <p className="card-text">
                                            <strong>Age:</strong> {e.age}
                                        </p>
                                        <p className="card-text">
                                            <strong>Gender:</strong> {e.gender}
                                        </p>
                                        <p className="card-text">
                                                <strong>Address:</strong> {e.address}
                                        </p>
                                        <p>
                                        <a href={"/booking/" + e._id} style={{ textDecoration: 'none' }} >
                                            <button id="table-button" className="btn btn-outline-primary btn-sm">
                                                <i className="fas fa-edit"></i>&nbsp;Book Now
                                            </button>
                                        </a>
                                        </p>
                                            </div>
                                    </div>
                                </div>
                  
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
