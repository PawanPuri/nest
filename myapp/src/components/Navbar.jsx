import React, from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // For navigation

 

  return (
    <AppBar
      position="sticy"
      sx={{
        backgroundColor: 'transparent', // Make the background transparent
        boxShadow: 'none', // Remove the shadow
        borderBottom: ' 1px solid gray',
        color:'black'

      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color:'black'}}>
         <Button color='inherit' component={Link} to="/"> MyApp</Button>
        </Typography>
        <Box>
         
          
          {/* Conditionally render buttons based on authentication */}
          
              <Button color="inherit" component={Link} to="/details">
                Details
              </Button>
            </Box>
      </Toolbar>
    </AppBar>)

};

export default Navbar;
