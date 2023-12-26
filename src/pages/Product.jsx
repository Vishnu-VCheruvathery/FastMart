import { Box, Button, Card, CardContent, Stack, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';

const StyledImage = styled('img')(({theme}) => ({
    width: '300px',
    padding: '15px',
    [theme.breakpoints.down('md')]:{
        width: '60%',
        height: '300px'
        
    }
}))

const Product = () => {
    const [imageCover, setImageCover] = useState(null);
    let userID = null
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = useSelector((state) => state.user.token)
    const serializedObj = queryParams.get('obj');
    let receivedObj = null;
    if(serializedObj){
        receivedObj = JSON.parse(decodeURIComponent(serializedObj));
    }
    
  

    if(token){
        userID = jwtDecode(token).id
    }

    const addToCart = async (data) => {
        try {
            const response = await axios.post(`http://localhost:3000/products/cart/${data.userID}/${data.id}`);
            console.log(response);
            toast.success('Added to Cart')
            setTimeout(() => {
                navigate("/cart");
            }, 3000)
           
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(receivedObj){
            import(`../images/${receivedObj.image}` /* @vite-ignore */)
            .then((image) => {
              setImageCover(image.default);
            })
            .catch((error) => {
              console.error(error);
            });
        }
        // Dynamically import the image when the component mounts
     
      }, [receivedObj.image]);

  return (
    <>
       <Stack direction={{xs: 'column', md:'row'}} sx={{
        margin: '50px auto',
        width: {xs: '88%', md: '60%'},
        padding: '5px',
        border: '2px solid gray',
        borderRadius: '0.5em',
        gap: '10px',
        marginBottom: {xs: '100px'}
        }}>
   <Box sx={{
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center'
   }}>
   <StyledImage 
   src={imageCover || receivedObj.imageUrl}/>
   </Box>
   <Box sx={{ width: '100%',
    display: 'flex', gap: '10px', flexDirection: 'column'
    }}>
    <Card sx={{display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    }}>
        <CardContent>
            <Typography variant='h6'>{receivedObj.name}</Typography>
            <Typography variant='h6' textAlign='center'
            sx={{marginTop: '10px',
            marginRight: '8px'
            }}
            >₹{receivedObj.price}</Typography>
        </CardContent>
    
            <Button sx={{
                backgroundColor: 'lightgrey',
                color: 'black',
                marginTop: '10px',
                marginBottom: '20px',
                width: {xs: '90%', md:'50%'},
                '&:hover': {
                    backgroundColor: '#cfd0d1'
                }
            }}
            onClick={() => { addToCart({ id: receivedObj._id, userID: userID }) }}
            >Add to Cart <AddShoppingCartIcon/></Button>
    </Card>
    <Card sx={{
        // height: '50%',
        paddingBottom: '10px',
        textAlign: 'center'
        }}>
        <CardContent>
            <Typography variant='body'>
            *Delivery within 5 days
        </Typography>
        <Typography variant='body2'>{receivedObj.info}</Typography>
        
        </CardContent>
    </Card>
   </Box>
   </Stack>
 
    </>
 
  )
}

export default Product
