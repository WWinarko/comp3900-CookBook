import React from 'react';
import { Stack } from '@mui/material';

import Navbar from '../components/Navbar';
import RecipeIngredients from '../components/RecipeIngredients';

function Recipe() {
  return (
    <div style={{ backgroundColor: '#F9FAF9' }}>
      <Navbar />
      <Stack
        pt={25}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9' }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%', height: '100%' }}
        >
          <Stack
            sx={{ width: '50%', height: '100%' }}
          >
            <RecipeIngredients />
          </Stack>
          <Stack
            sx={{ width: '50%', height: '100%', backgroundColor: 'yellow' }}
          >

          </Stack>

        </Stack>

      </Stack>
    </div>
    
  )
}

export default Recipe;