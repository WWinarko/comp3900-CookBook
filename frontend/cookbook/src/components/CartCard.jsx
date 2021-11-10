/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';


function CartCard({ ingredient, removeIngredient }) {
  return (  
    <Card sx={{width: '100%', marginTop: '20px', display: 'flex', flexDirection:'row', position: 'relative'}}>
      <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={ingredient['photo']}
            alt="Ingredient Image"
      />
      <CardContent>
        <Stack
          direction="column"
          spacing={3}
          sx={{width: '250px'}}
        >
          <Typography variant="h5" sx={{color: '#977554'}}>{ingredient['title']}</Typography>
          <Typography variant="h6" sx={{color: '#977554'}}>$ {ingredient['subtotal']}</Typography>
        </Stack>
      </CardContent>
      <Typography variant="h6" sx={{color: '#977554', alignSelf: 'center'}}>Quantity: {ingredient['quantity']}</Typography>
      <CloseSharpIcon onClick={() => removeIngredient(ingredient['id'])} sx={{position: 'absolute', right: 0, padding: '10px', cursor: 'pointer'}}/>
    </Card>
  )
}

export default CartCard;