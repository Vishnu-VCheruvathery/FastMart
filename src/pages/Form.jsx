import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getToken } from '../features/userSlice'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [loggedUser, setLoggedUser] = useState('')
   const [loggedPassword, setLoggedPassword] = useState('')
   const [role, setRole] = useState('')

   const Register = async() => {
    try {
     await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/register`, 
      {username:username, 
        password:password,
        role:role
      }
      )
      setUsername('')
      setPassword('')
      toast.success('Successfully Registered!')
    } catch (error) {
      console.log(error)
    }  
   
   }


   const Login = async() => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
        username: loggedUser,
        password: loggedPassword,
      });
      if (response.status === 200) {
        const token = await response.data.token;
        if (token) {
          // Token is valid, store it
          localStorage.setItem('authToken', token);
          dispatch(getToken())
          navigate("/")
          toast.success(`Welcome ${loggedUser}`);
        } else {
          // Handle invalid token
          toast.error(response.data.error);
        }
      } else {
        // Handle error response
        toast.error(response.data.error);
      }
    }catch(err){
      console.log(err)
    }
  };


  return (
    <Stack 
    direction={{xs:'column' ,lg: 'row', md: 'row'}} 
    spacing={{xs: 2, lg: 5}}
   sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: {xs: '20px', md: '50px'},
    marginBottom: '100px'
   }}
    >
      <Box sx={{
        backgroundColor: 'white',
        width: 300,
        height: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        borderRadius: '0.5em',
        gap: 3,
        border: '1px solid gray',
        padding: '10px'
      }}>
        <Typography variant='h5' sx={{fontWeight: 100}}>Login</Typography>
          <TextField
          required
          id="outlined-required"
          label='Enter Username'
          value={loggedUser}
          onChange={(e) => setLoggedUser(e.target.value)}
          autoComplete='off'
        />
           <TextField
          required
          id="outlined-required"
          type='password'
          label='Enter Password'
          value={loggedPassword}
          onChange={(e) => setLoggedPassword(e.target.value)}
          autoComplete='off'
        />
          <Button variant="contained" sx={{
            backgroundColor:"#2374f7"
          }}
          onClick={Login}
          >
            LOGIN
          </Button>
      </Box>
      <Box sx={{
        backgroundColor: 'white',
        width: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        borderRadius: '0.5em',
        gap: 3,
        border: '1px solid gray',
        padding: '10px'
      }}>
        <Typography variant='h5' sx={{fontWeight: 100}}>Register</Typography>
          <TextField
          required
          id="outlined-required"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='off'
          label='Enter Username'
        />
           <TextField
          required
          id="outlined-required"
          type='password'
          label='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='off'
        />
        <FormControl sx={{width: '90%'}}>
        <InputLabel>Type of Role:</InputLabel>
        <Select value={role}
        onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value='User'>User</MenuItem>
          <MenuItem value='Admin'>Admin</MenuItem>
        </Select>
        </FormControl>
          <Button variant="contained" sx={{
            backgroundColor:"#2374f7"
          }}
          onClick={Register}
          >
            REGISTER
          </Button>
       
    
      </Box>
    </Stack>
  )
}

export default Form
