import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import { Stack, Typography } from '@mui/material'
import axios from 'axios'
import ImageSlider from '../components/ImageSlider'
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'

const Home = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('payment');

    if (paymentStatus === 'success') {
      toast.success('Your order is placed!');
      window.history.replaceState({}, document.title, location.pathname); // Clear query params
    }
  }, [location.search]);
 
 
 

  const images = [
    {url: '/iPhone15.jpg', title: 'Iphone'},
    {url: '/laptop.webp', title: 'Laptop'},
    {url: '/wear.webp', title: 'Wear'}
  ]
  
  const containerStyles = {
    width: '500px',
    height: '280px',
    marginBottom: '30px',
  }

  const getProducts = async () => {
    try {
      const response = await axios.get('https://fastmart-api.onrender.com/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    getProducts();
  }, []);



  const phones = products.filter((product) => product.type === 'phone').slice(0, 3);
  const computers = products.filter((product) => product.type === 'computer').slice(0, 3);
  const clothes = products.filter((product) => product.type === 'fashion').slice(0, 3);

  return (
    <>
     
        <Stack
          direction="column"
          gap="10px"
          sx={{
            width: { xs: '50%', md: '60%' },
            margin: '10px auto',
            marginBottom: '150px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
         <div style={containerStyles}>
         <ImageSlider  slides={images} parentWidth={500}/>
         </div>
         

          <Typography variant="h6">Smart-Phones</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} gap="10px">
            {phones.map((phone) => (
              <Item item={phone} key={phone.id} />
            ))}
          </Stack>
          <Typography variant="h6">Laptop's/PC's</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} gap="10px">
            {computers.map((computer) => (
              <Item item={computer} key={computer.id} />
            ))}
          </Stack>
          <Typography variant="h6">Fashion</Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} gap="10px">
            {clothes.map((cloth) => (
              <Item item={cloth} key={cloth.id} />
            ))}
          </Stack>
        </Stack>
    </>
  );
};

export default Home
