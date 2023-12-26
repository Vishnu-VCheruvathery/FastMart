import { Button, Stack, Typography } from '@mui/material'
import Item from '../components/Item'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';



const Cart = () => {
 const [items, setItems] = useState([])
 const token = useSelector((state) => state.user.token)

 let id = null

 if(token){
     id = jwtDecode(token).id
 }

  const getCart = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:3000/products/cart/${id}`);
        const product = response.data.products
        // for(let i=0; i<product.length; i++){
        //   setItems(product[i])
        // }
        setItems(product)      
      }
    
    } catch (error) {
      console.log(error);
    }
  };

   const deleteCart = async() => {
    try {
      if(id){
        const response = await axios.delete(`http://localhost:3000/products/cart/${id}`)
        return response
      }
    } catch (error) {
      console.log(error)
    }
   }

  const buyItem = () => {
      fetch('http://localhost:3000/products/checkout',{
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify({items})
      }).then(res => {
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({url}) => {
        window.location = url
        toast.success('Order placed')
        deleteCart()
      }).catch(e => {
        console.error(e.error)
      })
  }

  useEffect(() => {
    getCart();
  }, [id]);

  useEffect(() => {
    console.log(items)
  }, [items])

  return (
    <Stack
    sx={{
      width: {xs: '60%', md: '40%'},
      border: '1px solid gray',
      margin: '20px auto',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '150px',
      borderRadius: '0.5em',
    }}
  >
    {token ? (
      <Stack sx={{
        gap: '10px', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
      }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <AddShoppingCartIcon />
          Cart
        </Typography>
        {items && items.length > 0 ? (
            items.map((item) => (
              <Item item={item} key={item._id} /> // Ensure each mapped item has a unique key
            ))
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        <Button
          sx={{
            backgroundColor: '#53fa4d',
            color: 'white',
            width: { xs: '90%', md: '50%' },
            '&:hover': {
              backgroundColor: '#64ff5e',
            },
          }}
          onClick={buyItem}
        >
          BUY
        </Button>
      </Stack>
    ) : (
      <Typography>Login to show your Cart</Typography>
    )}
  </Stack>
  )  
}
export default Cart
