import React from 'react';
import { makeStyles } from '@mui/styles';

import CategoryCircle from './CategoryCircle';

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
      <CategoryCircle/>
      <CategoryCircle/>
      <CategoryCircle/>
      <CategoryCircle/>
      <CategoryCircle/>
      <CategoryCircle/>
      <CategoryCircle/>
      <CategoryCircle/>
    </div>
  )
}

export default Category;