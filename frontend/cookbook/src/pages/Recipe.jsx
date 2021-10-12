import React, { useState } from 'react';
import { Stack } from '@mui/material';

import Navbar from '../components/Navbar';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeDescription from '../components/RecipeDescription';
import RecipeReview from '../components/RecipeReview';
import RecipeRecommendation from '../components/RecipeRecommendation';
import BuyRecipeModal from '../components/BuyRecipeModal';

function Recipe() {
  const [state, setState] = useState(false);
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
          sx={{ width: '100%' }}
        >
          <Stack
            sx={{ width: '50%' }}
          >
            <RecipeIngredients setState={setState} />
            {state}
          </Stack>
          <Stack
            sx={{ width: '50%' }}
          >
            <RecipeDescription />
          </Stack>
        </Stack>
        
        <Stack
          sx={{ width:'100%' }}
          pt={10}
        >
          <RecipeReview />
        </Stack>

        <Stack
          sx={{ width:'100%' }}
          pt={10}
        >
            <RecipeRecommendation />
        </Stack>
      </Stack>
      <BuyRecipeModal state={state} setState={setState} />
    </div>
    
  )
}

export default Recipe;