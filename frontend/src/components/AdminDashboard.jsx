import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles/AdminDashboard.css'; // Import the custom CSS
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/user/users");
        setUsers(response.data);
      } catch (err) {
        setError("Error loading users");
        console.error("Error loading users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    navigate(`/update/`+user._id, { state: { user } });
  };

  const handleDeleteClick = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8070/user/delete/${userId}`);
        alert(response.data.message);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        alert("Error deleting user");
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    
    <div className="dashboard-container">
      <Navbar/>
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <h3>List of All Users</h3>
      {error && <p className="error-message">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Contact</th>
            <th className="table-header">Age</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="table-cell">{user.full_name}</td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.phone_number}</td>
                <td className="table-cell">{user.age}</td>
                <td className="table-cell">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                </td>
                <td className="table-cell">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;