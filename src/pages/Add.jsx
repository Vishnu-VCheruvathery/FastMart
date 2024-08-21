import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, styled } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { CloudUpload } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const Add = () => {
   const [name, setName] = useState('')
   const [image, setImage] = useState('')
   const [price, setPrice] = useState('')
   const [info, setInfo] = useState('')
   const [productType, setProductType] = useState('')
   const token = useSelector((state) => state.user.token)

   const addProduct = async() => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("price", price)
    formData.append("info", info)
    formData.append("productType", productType)
    formData.append("image", image)
     try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/products/add`, formData, 
      {headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }}
      )
      toast.success('Added Product Successfully!')
      return response.data

     } catch (error) {
      console.log(error)
     }
   }

  return (
    <Stack gap={3} sx={{
      width: '50%', 
      margin: '20px auto', 
      border: '1px solid gray',
      padding: '20px',
      borderRadius: '0.5em',
      textAlign: 'center',
      marginBottom: '100px'
      }}>
      <Typography variant='h6' color='gray'>Create Product</Typography>
      <TextField label='Enter name' 
      multiline
      value={name}
      onChange={(e) => setName(e.target.value)}
      ></TextField>
       <Button 
      component="label" 
      variant="contained" 
      startIcon={<CloudUpload />
      }
      >
      Upload Image
      <VisuallyHiddenInput 
      type="file"   
      accept='.jpeg, .png, .jpg'
      onChange={(e) => setImage(e.target.files[0])}
      />
    </Button>
      <TextField 
      label='Enter Price'
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      ></TextField>
      <TextField 
      label='Enter Information' 
      multiline
      value={info}
      onChange={(e) => setInfo(e.target.value)}
      ></TextField>
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Type Of Product</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productType}
    onChange={(e) => setProductType(e.target.value)}
  >
     <MenuItem value="Phones">Phones</MenuItem>
     <MenuItem value="Computers">Computers</MenuItem>
     <MenuItem value="Kitchen">Kitchen</MenuItem>
     <MenuItem value="homeDecor">homeDecor</MenuItem>
     <MenuItem value="Clothes">Clothes</MenuItem>
     <MenuItem value="Toys">Toys</MenuItem>
  </Select>
</FormControl>
      <Button sx={{border: '1px solid gray', width: '50%', margin: '2px auto'}}
      onClick={addProduct}
      >Submit</Button>
    </Stack>
  )
}

export default Add
