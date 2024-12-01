import { Typography, styled } from '@mui/material'
import React from 'react'


const StyledFooter = styled('div')({
    bottom: 0,
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    height: '50px',
    gap: '5px'
  })

const Footer = () => {
  return (
    <StyledFooter>
      <Typography variant='h6'>©</Typography>
      <Typography variant='h6'>FastMart 2023-24</Typography>
    </StyledFooter>
  )
}

export default Footer
