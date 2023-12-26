import React, { useEffect, useState } from 'react'
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const Item = ({item}) => {
    const [imageCover, setImageCover] = useState(null)

    useEffect(() => {
      if(item.image){
        import(`../images/${item.image}` /* @vite-ignore */)
        .then((image) => {
          setImageCover(image.default);
        })
        .catch((error) => {
          console.error(error);
        });
      }
      // Dynamically import the image when the component mounts
     
    }, [item.image]);

  return (
    <Link to={{
      pathname: `/product/${item._id}`,
      search: `?obj=${encodeURIComponent(JSON.stringify(item))}`
    }}
     style={{textDecoration: 'none', color: 'black'}}> 
         <Stack sx={{
      width: '250px',
      border: '1px solid gray',
      borderRadius: '0.5em',
      display: 'flex',
      }}
      key={item._id}
      >
      <Box sx={{width: '58%', 
      margin: '2px auto'
      }}>
      <img 
       width='100%'
       style={{height: '150px'}}
      src={imageCover || item.imageUrl}/>
      </Box>
      <Box sx={{
        borderTop: '1px solid gray',
        width: '100%',
        padding: '5px'
      }}>
      {
        item.name.length>20 ? (
          <Tooltip title={item.name}>
          <Typography>{item.name.substr(0,19) + "..."}</Typography>
          </Tooltip>
          ) : ( <Typography>{item.name}</Typography>)
      }
     
      <Typography variant='body2'>₹{item.price}</Typography>
      </Box>
    </Stack>
    </Link>
    

 
  )
}

export default Item
