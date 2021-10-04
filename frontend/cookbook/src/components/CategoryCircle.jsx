import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({
  circle: {
    borderRadius: '50%',
    height: '90px',
    width: '90px',
    
    backgroundColor: 'red',

    display: 'inline-block',
    margin: '20px',
  },
}));

function CategoryCircle() {
  const classes = useStyles();
  return (
    <span className={classes.circle}></span>
  )
}

export default CategoryCircle;