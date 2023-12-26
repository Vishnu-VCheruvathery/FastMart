import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Tooltip, Typography, styled } from '@mui/material'
import { Search, Store} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, logout, setSearchTerm } from '../features/userSlice';
import jwtDecode from 'jwt-decode'
import axios from 'axios';



const StyledDiv = styled('div')({
  display: 'flex',
  border: 'gray 1px solid',
  width: '50%'
})

const SearchInput = styled('input')(({theme}) => ({
  padding: '10px',
  fontSize: '1.2em',
  width: '90%',
}))

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = useState(null);
  const token = useSelector((state) => state.user.token)
  const searchTerm = useSelector((state) => state.user.searchTerm);
  const [search, setSearch] = useState('')

 
  let admin = null;

  if (token) {
  admin = jwtDecode(token).role;
   }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

 
  const findBySearch = async () => {
    try {
      if (searchTerm) {
        const response = await axios.get(`http://localhost:3000/products/find/`, {
          params: {
            name: searchTerm
          }
        });
          const item = response.data[0]
        
        navigate({
          pathname: `/product/${item._id}`,
      search: `?obj=${encodeURIComponent(JSON.stringify(item))}`
      })
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    dispatch(getToken());
    dispatch(setSearchTerm(search));
  }, [token, search, dispatch]);

  return (
    <AppBar position='static'>
      <Container sx={{
        backgroundColor: 'black', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 15px',
        borderBottom: '1px solid gray'
        }} maxWidth='xl'>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
        <Store sx={{fontSize: '1.7em'}}/>
        <Typography 
        variant='h5'
        sx={{
          fontWeight: 700,
          fontStyle: 'italic'
        }}
        >
         <Link to='/' style={{
          textDecoration: 'none',
          color: 'white'
          }}>FastMart</Link> 
        </Typography>
      </Box>
      <StyledDiv>
        <SearchInput 
        value={search}
        placeholder='Search FastMart' 
        onChange={(e) => (setSearch(e.target.value))}/>
        <Button 
        onClick={findBySearch}
        sx={{color: 'white', width: '10%'}}>
        <Search sx={{fontSize: '2em', color: 'gray'}}/>
        </Button>
      </StyledDiv>
      <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar color='white'/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
          <Link to='/forms' style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Login/Register</Typography>
            </MenuItem>
          </Link>
          <Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Cart</Typography>
            </MenuItem>
          </Link>
          {admin === 'Admin' ?   <Link to='/add' style={{ textDecoration: 'none', color: 'black' }}>
          <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Add Product</Typography>
            </MenuItem>
          </Link>
          : null}
          {token ? <MenuItem onClick={() => dispatch(logout())}>
              <Typography textAlign='center' color='black'>Logout</Typography>
             </MenuItem> : null}
            </Menu>
          </Box>
      </Container>
    </AppBar>
  )
}

export default Navbar
