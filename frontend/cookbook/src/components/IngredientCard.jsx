import React from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';


function IngredientCard() {
  return (
    <Card sx={{width: '100%', marginTop: '10px'}}>
      <CardContent>
        <Stack
          direction="column"
        >
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1">Quantity</Typography>
          <Typography variant="subtitle1">Price</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default IngredientCard;