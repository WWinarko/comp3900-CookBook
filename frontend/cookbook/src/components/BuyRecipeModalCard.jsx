import React from 'react';
import { makeStyles } from '@mui/styles';

import Divider from '@mui/material/Divider';

import image from '../assets/cheese.png';

const useStyles = makeStyles({
  root: {
    width: '600px',
    height: '150px',
    borderRadius: '5px',

    margin: '10px 10px 10px 10px',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'white',
  },
  thumbnail: {
    width: '115px',
    height: '115px',

    margin: '5px',
  }
})

function BuyRecipeModalCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={image} alt='thumbnail' className={classes.thumbnail}/>
      <div style={{ backgroundColor: 'blue', width:'200px', height: '150px'}}></div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div style={{ backgroundColor: 'white', width:'200px', height: '150px'}}></div>
    </div>
  )
}

export default BuyRecipeModalCard;