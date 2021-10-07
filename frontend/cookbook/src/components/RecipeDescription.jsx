import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';


import RoundButton from './RoundButton';
import RecipeStepsContainer from './RecipeStepsContainer';
import { RecipeData } from './RecipeData';

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

function RecipeDescription() {
  const classes = useStyles();
  const location = useLocation();
  const recipeId = location.pathname.split('/').pop();

  const handleFollow = () => {
    console.log('a');
  }

  return (
    <Stack className={classes.root}
      justifyContent="center"
      ml={3}
    >
      <h2 style={{ marginBottom:'0', color: '#FE793D' }}>Name</h2>
      <Divider 
        sx={{ backgroundColor:'#FE793D', height: '1px' }}
      />
      <div style={{ color: '#89623D' }}>
        <p>Here’s a big, speedy chicken salad to serve as a main course. Quick to put together using a store bought rotisserie chicken, all my favourite vegetables, a sprinkle of bacon, all tossed in a herby garlicky salad dressing.
        </p>
        <p>Make this for dinner tonight, work tomorrow, or a leisurely weekend lunch with friends!</p>
      </div>

      <Stack
        justifyContent="space-between"
        direction="row"
        sx={{ width:'90%' }}
      >
        <div style={{ color:'#89623D', fontSize:'18' }}>
          <p>Sold: 123</p>
          <p>Difficulty: 2.0/5.0</p>
        </div>
        <div style={{ color:'#89623D', fontSize:'18' }}>
          <p>Rating: </p>
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
            <p style={{ paddingTop:'10%', margin:'0', fontWeight: 'bold' }}>Author</p>
            <p style={{ paddingTop:'10%', margin:'0' }}>Followers:10k</p>
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
          <h3>Prep time</h3>
          <h3>Cook time</h3>
          <h3>Serves</h3>
        </div>
        <Divider 
          sx={{ backgroundColor:'#9D9D9D', height: '1px', width:'100%' }}
        />
      </Stack>

      <Stack>
        <h2 style={{ marginBottom: '5px', color:'#89623D' }}>Steps</h2>
        <RecipeStepsContainer recipesData={RecipeData.properties[recipeId]} />
      </Stack>
    </Stack>
  )
}

export default RecipeDescription;