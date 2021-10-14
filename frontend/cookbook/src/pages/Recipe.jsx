import React, { useState } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeDescription from '../components/RecipeDescription';
import RecipeReview from '../components/RecipeReview';
import RecipeRecommendation from '../components/RecipeRecommendation';
import BuyRecipeModal from '../components/BuyRecipeModal';

function Recipe() {
  const location = useLocation();
  const recipeId = (location.pathname.split('/')).pop();
  const [recipe, setRecipe] = useState();
  const [state, setState] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/view?recipe_id=' + recipeId, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setRecipe(res);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  return (
    <div>
      <Navbar />
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress
            />
          </div>
        
        : <div style={{ backgroundColor: '#F9FAF9' }}>
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
                <RecipeIngredients setState={setState} recipe={recipe} />
                {state}
              </Stack>
              <Stack
                sx={{ width: '50%' }}
              >
                <RecipeDescription recipe={recipe}/>
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
          <BuyRecipeModal state={state} setState={setState} recipe={recipe}/>
        </div>
      }
    </div>
  )
}

export default Recipe;