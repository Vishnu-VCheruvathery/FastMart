import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Item from '../components/Item'
import { Stack } from '@mui/material'

const Stock = () => {
    const {category} = useParams()
    const [products, setProducts] = useState([])

    const getProduct = async() => {
         try {
            const response = await axios.get('https://fastmart-api.onrender.com/products/stock',{
            params: {
               category: category
            }
        })
           const item = response.data
           setProducts(item)
         } catch (error) {
            console.log(error)
         }
    }

      useEffect(() => {
          getProduct()
      }, [category])


  return (
    <Stack direction={{ xs: 'column', md: 'row' }} sx={{
   
       display: 'flex',
       width: '60%',
       flexWrap: 'wrap',
       alignItems: 'center',
       margin: '10px auto',
       gap: '20px',
       marginBottom: '150px',
    }}>

    {
        products.map((product) => (
            <Item item={product}/>
        ))
    
       }
 
    
    </Stack>
  )
}

export default Stock
