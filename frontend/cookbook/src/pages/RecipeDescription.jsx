import React from 'react';
import { makeStyles } from '@mui/styles';

import Divider from '@mui/material/Divider';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})

function RecipeDescription() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>Name</div>
      <Divider 
        variant="middle" 
        sx={{ backgroundColor:'#FE793D', height: '1px' }}
      />
      <div>Here’s a big, speedy chicken salad to serve as a main course. Quick to put together using a store bought rotisserie chicken, all my favourite vegetables, a sprinkle of bacon, all tossed in a herby garlicky salad dressing.

Make this for dinner tonight, work tomorrow, or a leisurely weekend lunch with friends!</div>
    </div>
  )
}

export default RecipeDescription;