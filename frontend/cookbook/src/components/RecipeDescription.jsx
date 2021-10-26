import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { Stack, Rating } from '@mui/material';

import RoundButton from './RoundButton';
import RecipeStepsContainer from './RecipeStepsContainer';

const useStyles = makeStyles({
  root: {
    width: '75%',
  },
  circle: {
    borderRadius: '50%',
    height: '80px',
    width: '80px',
    
    backgroundColor: 'red',

    display: 'inline-block',
    margin: '20px',
  },
  preptime: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: '#9D9D9D',
  },
})

function RecipeDescription({ recipe }) {
  const classes = useStyles();
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    if (recipe === undefined) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [recipe])
  
  const handleFollow = () => {
    console.log('a');
  }

  return (
    <div>
      {loadingState
        ? <>
          </>
        : <Stack className={classes.root}
            justifyContent="center"
            ml={3}
          > 
            <h2 style={{ marginBottom:'0', color: '#FE793D' }}>{recipe.title}</h2>
            <Divider 
              sx={{ backgroundColor:'#FE793D', height: '1px' }}
            />
            <div style={{ color: '#89623D' }}>
              <p>{recipe.intro}</p>
            </div>
      
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ width:'90%' }}
            >
              <div style={{ color:'#89623D', fontSize:'18' }}>
                <p>Sold: {recipe.sold}</p>
                <p>Difficulty: {recipe.difficulty}/5</p>
              </div>
              <div style={{ color:'#89623D', fontSize:'18', display: 'flex', flexDirection: 'row' }}>
                <p>Rating: </p>
                <Rating name="read-only" value={recipe.rating} readOnly 
                    sx={{ margin: '10px' }}
                  />
              </div>
            </Stack>
      
            <Stack
              direction="row"
              sx={{ width:"90%" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                alignItems="center"
              >
                <img src="https://ihatetomatoes.net/demos/_rw/01-real-estate/tn_property01.jpg" className={classes.circle}/>
                <Stack
                >
                  <p style={{ paddingTop:'10%', margin:'0', fontWeight: 'bold' }}>{recipe.owner_username}</p>
                  <p style={{ paddingTop:'10%', margin:'0' }}>Followers:{recipe.owner_follower}</p>
                </Stack>
              </Stack>
              <div><RoundButton name={"Follow"} onclick={handleFollow} /></div>
            </Stack>
      
            <Stack
              alignItems="center"
            >
              <Divider 
                sx={{ backgroundColor:'#9D9D9D', height: '1px', width:'100%' }}
              />
              <div className={classes.preptime}>
                <h3>Prep time: {recipe.preptime}</h3>
                <h3>Cook time: {recipe.cooktime}</h3>
                <h3>Serves: {recipe.serves}</h3>
              </div>
              <Divider 
                sx={{ backgroundColor:'#9D9D9D', height: '1px', width:'100%' }}
              />
            </Stack>
      
            <Stack>
              <h2 style={{ marginBottom: '5px', color:'#89623D' }}>Steps</h2>
              <RecipeStepsContainer recipesData={recipe.steps} />
            </Stack>
          </Stack>
      }
    </div>
  )
}

RecipeDescription.propTypes = {
  recipe: PropTypes.object
}

export default RecipeDescription;