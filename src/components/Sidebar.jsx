import { Box, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Phones', 'Kitchen', 'Computers', "Home Decor", 'Fashion', "Toys"]

const Sidebar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
  
    const handleToggle = () => {
      setOpen(!open);
    };
  

    return (
      <>
      <Box sx={{backgroundColor: 'black', width: '100%'}}>
      <IconButton onClick={handleToggle}>
          <MenuIcon sx={{ color: 'white', fontSize: '1.7em' }} />
        </IconButton>
      </Box>
        <Drawer anchor="left" open={open} onClose={handleToggle}>
          <List>
            {steps.map((step, index) => (
              <ListItem key={index}>
                <Link to={`/stock/${step}`} style={{ 
                  textDecoration: 'none', 
                  color: 'black',
                  fontSize: '1.2em', 
                   }}
                >{step}</Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </>
    );
  };

export default Sidebar
