import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Stack, Typography, Button, Box } from '@mui/material';
import image from '../assets/cheese.png';


function IngredientModalCard() {
  return (
    <Box mt={2} sx={{width: '400px'}}>
      <Card sx={{width: '100%', marginTop: '10px', display: 'flex', flexDirection:'row'}}>
        <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={image}
              alt="Ingredient Image"
        />
        <CardContent>
          <Stack
            direction="column"
            spacing={3}
            sx={{width: '250px'}}
          >
            <Typography variant="subtitle1" sx={{color: '#977554'}}>Best Parmesan Cheese</Typography>
            <Typography variant="subtitle1" sx={{color: '#977554'}}>$10</Typography>
          </Stack>
        </CardContent>
      </Card>
      <CardActions sx={{display: 'flex', flexDirection:'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
        <Button sx={{color: '#FE793D', textTransform: 'none', fontSize: '18px'}}>Select</Button>
      </CardActions>
    </Box>
  )
}

export default IngredientModalCard;