import React from 'react';
import { makeStyles } from '@mui/styles';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import RecommendationContainer from './RecommendationContainer';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '30px',

    color: '#FE793D',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: '75px',
  },
  arrowLeft: {
    paddingRight: '1.5%',

    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  arrowRight: {
    paddingLeft: '1.5%',

    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
})

function RecipeRecommendation() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p className={classes.header}>Similar Recipes</p>
      <div className={classes.container}>
        <ArrowBackIosIcon className={classes.arrowLeft} />
        <RecommendationContainer />
        <ArrowForwardIosIcon className={classes.arrowRight} />
      </div>
      <p className={classes.header}>Recommendations</p>
      <div className={classes.container}>
        <ArrowBackIosIcon className={classes.arrowLeft} />
        <RecommendationContainer />
        <ArrowForwardIosIcon className={classes.arrowRight} />
      </div>
    </div>
  )
}

export default RecipeRecommendation;