import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    image: null, // Image field
  });

  const [qrCodeValue, setQRCodeValue] = useState("");
  const qrCodeRef = useRef(null);
  const generateVCard = (data) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${data.firstName} ${data.middleName} ${data.lastName}
N:${data.lastName};${data.firstName};${data.middleName}
TEL;TYPE=CELL:${data.phoneNumber}
EMAIL:${data.email}
ADR;TYPE=HOME:;;${data.address}
END:VCARD`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  useEffect(() => {
    const qrData = generateVCard(formData);
    setQRCodeValue(qrData);
  }, [formData]);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Ensure the QR code canvas is rendered
    const qrCodeCanvas = qrCodeRef.current?.querySelector("canvas");
    console.log(qrCodeCanvas)
    if (!qrCodeCanvas) {
      console.error("QR code canvas not found");
      return;
    }
  
    // Convert QR code to a Base64 image
    const qrCodeImage = qrCodeCanvas.toDataURL("image/png");
    console.log(qrCodeImage)
  
    // Construct FormData
    const formDataObj = new FormData();
    formDataObj.append("firstName", formData.firstName);
    formDataObj.append("middleName", formData.middleName);
    formDataObj.append("lastName", formData.lastName);
    formDataObj.append("phoneNumber", formData.phoneNumber);
    formDataObj.append("email", formData.email);
    formDataObj.append("address", formData.address);
    formDataObj.append("qrCode", qrCodeImage);
  
    // Append image file if selected
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }
  
    try {
      const response = await axios.post("http://localhost:3002/vcard", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  return (
    <div className="container">
      <Typography variant="h4" className="mb-4 text-center">
        VCard Form with QR Code
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required />
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Image
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {formData.image && <Typography>{formData.image.name}</Typography>}
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, mb: 2, padding: "10px 20px" }}>
          Submit & Generate QR Code
        </Button>
        {qrCodeValue && (
          <div ref={qrCodeRef} className="mt-4" sx={{ mt: 4, padding: 2, border: "1px solid #ccc", display: 'inline-block' }}>
            <QRCodeCanvas value={qrCodeValue} />
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
