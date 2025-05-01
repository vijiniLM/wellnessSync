import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Box,
  TextField,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    pickedForDeliveryOrders: 0,
    completedOrders: 0,
  });
  const chartData = [
    { name: "Pending", value: statistics.pendingOrders },
    { name: "Picked", value: statistics.pickedForDeliveryOrders },
    { name: "Delivered", value: statistics.completedOrders },
  ];
  
  const [isLoading, setIsLoading] = useState(false);

  const filteredOrdersPaginated = filteredOrders
    .filter((order) => {
      if (statusFilter === "all") return true;
      return order.status === statusFilter;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/orders/all");
      const data = await response.json();

      if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);

        const filteredData = data.orders.filter(
          (order) => order.deliveryStatus !== "Processing"
        );
        setFilteredOrders(filteredData);

        let total = data.orders.length;
        let pending = data.orders.filter(
          (order) => order.status === "pending"
        ).length;
        let pickedForDelivery = data.orders.filter(
          (order) => order.status === "picked"
        ).length;
        let completed = data.orders.filter(
          (order) => order.status === "delivered"
        ).length;

        setStatistics({
          totalOrders: total,
          pendingOrders: pending,
          pickedForDeliveryOrders: pickedForDelivery,
          completedOrders: completed,
        });
      } else {
        console.error("Orders data is not an array", data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);

    const filtered = orders
      .filter(
        (order) =>
          order.status !== "Waiting for deliver person pickup" &&
          order.status !== "Processing"
      )
      .filter((order) => order._id.includes(event.target.value));
    setFilteredOrders(filtered);
  };

  const generateCompletedOrdersReport = () => {
    const completedOrders = orders.filter(
      (order) => order.status === "delivered"
    );

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Completed Orders Report", 14, 20);

    const headers = [
      "Order ID",
      "Delivery Address",
      "Order Date",
      "Total Amount",
      "Phone Number",
    ];

    const rows = completedOrders.map((order) => {
      const totalAmount = order.order.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return [
        order._id,
        order.address,
        new Date(order.createdAt).toLocaleDateString(),
        `$${totalAmount.toFixed(2)}`,
        order.phoneNumber || "-",
      ];
    });

    doc.setFontSize(12);
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30,
    });

    doc.save("completed_orders_report.pdf");
  };

  const handleTakeOrder = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/orders/update-status",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, status: "picked" }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        await fetchOrders();
      } else {
        console.error("Failed to pick order:", data.message);
      }
    } catch (error) {
      console.error("Error during picking order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompletedOrder = async (orderId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/orders/update-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            status: "delivered",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        await fetchOrders();
      } else {
        console.error("Failed to mark as delivered:", data.message);
      }
    } catch (error) {
      console.error("Error during completing order:", error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f0f2f5",
        minHeight: "140vh",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Delivery Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ marginBottom: 4 }}
      >
        {[
          { title: "Total Orders", value: statistics.totalOrders },
          {
            title: "Picked For Delivery",
            value: statistics.pickedForDeliveryOrders,
          },
          { title: "Completed Orders", value: statistics.completedOrders },
        ].map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                background: "#1976d2",
                color: "white",
                boxShadow: 3,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {stat.title}
                </Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 5 }}>
  <Typography variant="h6" align="center" gutterBottom>
    Order Status Overview
  </Typography>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#1976d2" />
    </BarChart>
  </ResponsiveContainer>
</Box>


      <Box sx={{ marginBottom: 3, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search by Order ID"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: "50%" }}
        />
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Button variant="contained" onClick={generateCompletedOrdersReport}>
          Generate Completed Orders Report (PDF)
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {/* Filter Dropdown */}
        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // Reset to first page when filter changes
          }}
          SelectProps={{ native: true }}
          sx={{ width: 250 }}
        >
          <option value="all">All</option>
          <option value="Waiting for deliver person pickup">
            Waiting for Deliver Person
          </option>
          <option value="picked">Picked</option>
          <option value="delivered">Delivered</option>
        </TextField>

        {/* Pagination Controls */}
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              const maxPage = Math.ceil(
                filteredOrders.filter((order) =>
                  statusFilter === "all" ? true : order.status === statusFilter
                ).length / itemsPerPage
              );
              setCurrentPage((prev) => Math.min(prev + 1, maxPage));
            }}
            disabled={
              currentPage >=
              Math.ceil(
                filteredOrders.filter((order) =>
                  statusFilter === "all" ? true : order.status === statusFilter
                ).length / itemsPerPage
              )
            }
          >
            Next
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Delivery Address
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Order Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delivery Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrdersPaginated.map((order) => {
              const totalAmount = order.order.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <TableRow key={order._id} hover>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${totalAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.status === "Waiting for deliver person pickup" && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ marginRight: 1 }}
                        onClick={() => handleTakeOrder(order._id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Taking..." : "Take Order"}
                      </Button>
                    )}

                    {order.status === "picked" && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleCompletedOrder(order._id)}
                      >
                        Completed
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
