import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import Divider from '@mui/material/Divider';

import image from '../../assets/cheese.png';

const useStyles = makeStyles({
  root: {
    width: '400px',
    height: '100px',
    borderRadius: '5px',

    margin: '10px 10px 10px 10px',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'white',
  },
  thumbnail: {
    width: '85px',
    height: '85px',

    margin: '5px',
  }
})

function BuyRecipeModalCard({ name }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={image} alt='thumbnail' className={classes.thumbnail}/>
      <div>{name}</div>
      <Divider orientation="vertical" variant="middle" flexItem />
    </div>
  )
}

BuyRecipeModalCard.propTypes = {
  name: PropTypes.string,
}

export default BuyRecipeModalCard;