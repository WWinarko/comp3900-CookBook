import React from 'react';
import { makeStyles } from '@mui/styles';

import RecipeHomeCard from './RecipeHomeCard';

const useStyles = makeStyles(({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

function Category() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <RecipeHomeCard/>
      <RecipeHomeCard/>
      <RecipeHomeCard/>
      <RecipeHomeCard/>
    </div>
  )
}

export default Category;