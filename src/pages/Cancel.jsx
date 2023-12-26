import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <Box sx={{
      width: '80%',
      height: '500px',
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     margin: '2px auto',
     marginTop: '50px'
    }}>
     <img 
     src='/38132960.jpg'
     style={{
      height: '300px'
     }}
     >
      
     </img>
     <Typography variant='h6'>Sorry your order was canceled</Typography>
     <Link to='/'>
     <Button>Go Back</Button>
     </Link>
    
   
    </Box>
 
  
  )
}

export default Cancel
