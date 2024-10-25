import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams to get the ID from the route
import './IdentityCard.css';  // CSS for styling

const IdentityCard = () => {
  const { id } = useParams();  // Extract the ID from the route
  const [vCardData, setVCardData] = useState(null);

  useEffect(() => {
    // Fetch data by ID
    axios.get(`http://localhost:3002/vcard/${id}`)
      .then(response => {
        setVCardData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the VCard data:', error);
      });
  }, [id]);

  const handlePrint = () => {
    window.print();  // Trigger browser print
  };

  if (!vCardData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="identity-card">
      <div className="identity-card-content" id="printable-card">
        {/* Left side with Name and Address */}
        <div className="identity-left">
          <h2>{vCardData.firstName} {vCardData.middleName} {vCardData.lastName}</h2>
          <p><strong>Phone:</strong> {vCardData.phoneNumber}</p>
          <p><strong>Email:</strong> {vCardData.email}</p>
          <p><strong>Address:</strong> {vCardData.address}</p>
        </div>

        {/* Right side with Image and QR code */}
        <div className="identity-right">
          <img src={`http://localhost:3002${vCardData.imageUrl}`} alt="Profile" className="profile-image" />
          <img src={vCardData.qrCode} alt="QR Code" className="qr-code" />
        </div>
      </div>

      {/* Print button */}
      <button className="print-button" onClick={handlePrint}>Print</button>
    </div>
  );
};

export default IdentityCard;
