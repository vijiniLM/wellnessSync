import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaUser, FaCheckCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const TrainerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    activePlans: 0,
    activeUsers: 0,
    pendingApprovals: 0,
    recentPlans: [],
    assignedUsers: [],
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/trainer/dashboard")
      .then(response => setDashboardData(response.data))
      .catch(error => console.error("Error fetching dashboard data:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <h2 className="text-lg font-bold">Active Plans</h2>
              <p className="text-2xl">{dashboardData.activePlans}</p>
            </div>
            <FaCheckCircle className="text-green-500 text-3xl" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <h2 className="text-lg font-bold">Active Users</h2>
              <p className="text-2xl">{dashboardData.activeUsers}</p>
            </div>
            <FaUser className="text-blue-500 text-3xl" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between">
            <div>
              <h2 className="text-lg font-bold">Pending Approvals</h2>
              <p className="text-2xl">{dashboardData.pendingApprovals}</p>
            </div>
            <FaCheckCircle className="text-yellow-500 text-3xl" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Workout Plans */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">Recent Workout Plans</h3>
          <Button><IoMdAdd className="mr-2" /> Create New Plan</Button>
        </div>
        {dashboardData.recentPlans.map((plan, index) => (
          <div key={index} className="p-2 border-b">
            <h4 className="text-lg font-semibold">{plan.name}</h4>
            <p className="text-sm text-gray-600">{plan.duration} weeks • {plan.sessions} sessions</p>
          </div>
        ))}
      </div>

      {/* Assigned Users */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Assigned Users</h3>
        {dashboardData.assignedUsers.map((user, index) => (
          <div key={index} className="flex justify-between p-2 border-b">
            <div>
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-600">{user.plan}</p>
            </div>
            <p className="text-sm font-bold">Progress: {user.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerDashboard;
