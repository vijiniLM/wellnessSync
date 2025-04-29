import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './styles/UpdateUser.css'; // Import custom CSS

const UpdateUser = () => {
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitness_goal: "",
    address: "",
    phone_number: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8070/user/get/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8070/user/update/${id}`, user)
      .then((response) => {
        alert(response.data.message);
        navigate("/"); // Navigate after update success
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Error updating user.");
      });
  };

  return (
    <div className="update-user-container">
      <Link to="/" className="back-link">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3 className="update-user-heading">Update User</h3>
      <form onSubmit={submitForm} className="update-user-form">
        <div className="form-group">
          <label htmlFor="full_name" className="label">Full Name:</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={user.full_name}
            onChange={inputHandler}
            placeholder="Enter your Full Name"
            autoComplete="off"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="label">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            placeholder="Enter your Email"
            autoComplete="off"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age" className="label">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={user.age}
            onChange={inputHandler}
            placeholder="Enter your Age"
            autoComplete="off"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender" className="label">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={user.gender}
            onChange={inputHandler}
            className="select"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="height" className="label">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={user.height}
            onChange={inputHandler}
            placeholder="Enter your Height"
            autoComplete="off"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight" className="label">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={user.weight}
            onChange={inputHandler}
            placeholder="Enter your Weight"
            autoComplete="off"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fitness_goal" className="label">Fitness Goal:</label>
          <input
            type="text"
            id="fitness_goal"
            name="fitness_goal"
            value={user.fitness_goal}
            onChange={inputHandler}
            placeholder="Enter your Fitness Goal"
            autoComplete="off"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="label">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={inputHandler}
            placeholder="Enter your Address"
            autoComplete="off"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_number" className="label">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={user.phone_number}
            onChange={inputHandler}
            placeholder="Enter your Phone Number"
            autoComplete="off"
            className="input"
          />
        </div>

        <div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;