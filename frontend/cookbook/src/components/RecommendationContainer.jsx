import React from 'react';
import { makeStyles } from '@mui/styles';

import { RecipeData } from './Recipe/RecipeData';
import RecommendationCard from './RecommendationCard';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '24px',

    color: '#FE793D',
  },
 
})

function RecommendationContainer() {
  const classes = useStyles();
  const recipeData = RecipeData.properties.slice(0,3);
  return (
    <div className={classes.root}>
      {recipeData.map((recipe, index) => {
        return (
          <RecommendationCard data={recipe} key={index}/>
        )
      })}
    </div>
  )
}

export default RecommendationContainer;