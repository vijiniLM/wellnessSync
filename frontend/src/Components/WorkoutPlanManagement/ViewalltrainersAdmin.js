import React, { useState, useEffect } from "react";
import axios from "axios";
// import NavBar from "./navbar";
import { useParams } from "react-router-dom";
import "../../style/retrivetable.css"
import "../../style/header.css"
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

    //     axios.delete(http://localhost:8000/Emergency/delete/${id})
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

    //     axios.post(http://localhost:8000/DeEmergency/save, cleanData)
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

    const searchAppointment = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="main-container">
            <div className="body-container clearfix">
                <div className="order-section-one-container ">
                    <div className="order-section-one-left ">
                        <h3 style={{ marginLeft: "25px", marginRight: "5px" }}>
                            View ALL Trainers
                        </h3>
                    </div>
                    <div className="order-section-one-right">
                        <input onChange={searchAppointment} type="search" placeholder="Search" className="search-box" />
                    </div>
                </div>

                <div className="order-section-two-container">
                    <table className="table">
                        <thead id="app-table">
                            <tr>
                                <th className="order-table-header-col-1" scope="col">Number</th>
                                <th className="order-table-header-col-1" scope="col">Name</th>
                                <th className="order-table-header-col-1" scope="col">Specialization</th>
                                <th className="order-table-header-col-1" scope="col">Email</th>
                                <th className="order-table-header-col-1" scope="col">Contact No</th>
                                <th className="order-table-header-col-1" scope="col">Age</th>
                                <th className="order-table-header-col-1" scope="col">Gender</th>
                                <th className="order-table-header-col-1" scope="col">Address</th>
                                <th className="order-table-header-col-1" scope="col">Profile Picture</th>
                                <th className="order-table-header-col-1" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainer && trainer.filter((e) =>
                                e.full_name.includes(searchQuery) ||
                   
                                e.full_name.toLowerCase().includes(searchQuery)
                            ).map((e, index) => (
                                <tr key={e._id} className="order-table-row">
                                    <th className="order-table-col-1" scope="row">{index + 1}</th>
                                    <td className="order-table-col-1">{e.full_name}</td>
                                    <td className="order-table-col-1">{e.specialization}</td>
                                    <td className="order-table-col-1">{e.email}</td>
                                    <td className="order-table-col-1">{e.phone_number}</td>
                                    <td className="order-table-col-1">{e.age}</td>
                                    <td className="order-table-col-1">{e.gender}</td>
                                    <td className="order-table-col-1">{e.address}</td>
                                    <td className="order-table-col-1">{e.profilePicture}</td>
                                 
                                    {/* <td id="action-button">
                                        <a href={"/emeedit/" + e._id} style={{ textDecoration: 'none' }}>
                                            <button id="table-button" className="btn btn-outline-primary btn-sm">
                                                <i className="fas fa-edit"></i>&nbsp;Edit
                                            </button>
                                        </a>
                                        &nbsp;
                                        <button id="table-button" className="btn btn-outline-danger btn-sm" onClick={() => deleteData(e._id)}>
                                            <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                        </button>
                                        &nbsp;
                                        
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}