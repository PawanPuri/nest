import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const VCardTable = () => {
  const [vCardData, setVCardData] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch VCard data from the backend
  useEffect(() => {
    const fetchVCardData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/vcard');
        setVCardData(response.data); // Store the fetched VCard data
      } catch (error) {
        console.error('Error fetching VCard data:', error);
      }
    };

    fetchVCardData();
  }, []);

  // Function to navigate to IdentityCard component with VCard ID
  const handleViewCard = (id) => {
    navigate(`/identity-card/${id}`); // Navigate to IdentityCard component with ID in the route
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>QR Code</TableCell>
            <TableCell>Actions</TableCell> {/* New Actions column for button */}
          </TableRow>
        </TableHead>
        <TableBody>
          {vCardData.map((vCard) => (
            <TableRow key={vCard._id}>
              <TableCell>
                {vCard.firstName} {vCard.middleName} {vCard.lastName}
              </TableCell>
              <TableCell>
                <Avatar
                  alt={`${vCard.firstName} ${vCard.lastName}`}
                  src={`http://localhost:3002${vCard.imageUrl}`}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell>
                <img
                  src={vCard.qrCode}
                  alt="QR Code"
                  style={{ width: 100, height: 100 }}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleViewCard(vCard._id)}>
                  View Card
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VCardTable;
