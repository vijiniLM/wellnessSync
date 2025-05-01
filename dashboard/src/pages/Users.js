import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Box,
  Chip,
} from '@mui/material';

const Users = () => {
  const [deliveryPerson, setDeliveryPerson] = useState(null);

  useEffect(() => {
    const fetchDeliveryPerson = async () => {
      try {
        const response = await fetch('/deliveryPerson.json');
        const data = await response.json();
        setDeliveryPerson(data);
      } catch (error) {
        console.error('Error fetching delivery person data:', error);
      }
    };

    fetchDeliveryPerson();
  }, []);

  if (!deliveryPerson) {
    return (
      <Box sx={{ textAlign: 'center', padding: '60px' }}>
        <Typography variant="h6" color="textSecondary">
          Loading delivery person profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
        Delivery Person Profile
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
        {/* Profile Picture and Basic Info */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              textAlign: 'center',
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: 'white',
            }}
          >
            <Avatar
              alt="Profile"
              src={deliveryPerson.profilePicture}
              sx={{
                width: 150,
                height: 150,
                margin: '0 auto 16px auto',
              }}
            />
            <Typography variant="h6" fontWeight={600}>
              {deliveryPerson.name}
            </Typography>
            <Chip
              label={deliveryPerson.status}
              color={deliveryPerson.status === 'Picked for Delivery' ? 'warning' : 'success'}
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Paper>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={7}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {deliveryPerson.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Phone:</strong> {deliveryPerson.phone}
              </Typography>

              <Typography variant="h6" gutterBottom fontWeight={600}>
                Vehicle Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Vehicle Type:</strong> {deliveryPerson.vehicle}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Vehicle Number:</strong> {deliveryPerson.vehicleNumber}
              </Typography>

              <Typography variant="h6" gutterBottom fontWeight={600}>
                About
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2">{deliveryPerson.bio}</Typography>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Users;
