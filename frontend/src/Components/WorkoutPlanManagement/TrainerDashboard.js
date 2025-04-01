import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function TrainerDashboard() {
    const [trainers, setTrainers] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTrainerData() {
            try {
                const trainersResponse = await axios.get("/api/trainers"); // Adjust API endpoint as needed
                const workoutResponse = await axios.get("/api/workoutplans");
                const assignedUsersResponse = await axios.get("/api/assignedUsers");
                
                setTrainers(trainersResponse.data);
                setWorkoutPlans(workoutResponse.data);
                setAssignedUsers(assignedUsersResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchTrainerData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Trainer Dashboard</h2>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 shadow-md rounded-md text-center">
                    <p className="text-xl font-semibold">Active Plans</p>
                    <p className="text-2xl">{workoutPlans.length}</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-md text-center">
                    <p className="text-xl font-semibold">Active Users</p>
                    <p className="text-2xl">{assignedUsers.length}</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-md text-center">
                    <p className="text-xl font-semibold">Pending Approvals</p>
                    <p className="text-2xl">{/* Fetch pending approvals */}</p>
                </div>
            </div>

            {/* Recent Workout Plans */}
            <div className="bg-white p-6 shadow-md rounded-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Recent Workout Plans</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                        <FaPlus className="mr-2" /> Create New Plan
                    </button>
                </div>
                <div>
                    {Array.isArray(workoutPlans) && workoutPlans.map((plan) => (
                        <div key={plan._id} className="p-3 border-b flex justify-between items-center">
                            <p className="font-semibold">{plan.title}</p>
                            <div className="flex space-x-3">
                                <FaEdit className="cursor-pointer text-blue-500" />
                                <FaTrash className="cursor-pointer text-red-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Assigned Users */}
            <div className="bg-white p-6 shadow-md rounded-md">
                <h3 className="text-xl font-semibold mb-4">Assigned Users</h3>
                <div>
                    {Array.isArray(assignedUsers) && assignedUsers.map((user) => (
                        <div key={user._id} className="p-3 border-b flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                            <div className="w-full">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.assignedWorkout}</p>
                                <div className="bg-gray-200 w-full h-2 rounded-md mt-2">
                                    <div className="bg-blue-500 h-2 rounded-md" style={{ width: "65%" }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
