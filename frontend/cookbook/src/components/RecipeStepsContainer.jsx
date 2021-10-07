import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';


import RecipeStepsCard from './RecipeStepsCard';


const useStyles = makeStyles(({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    color: '#9D9D9D',
    fontSize: '18px',
  },
}));

function RecipeStepsContainer({ recipesData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {recipesData.steps.map((step, index) => {
        return (
          <div key={index}>
            <p className={classes.title}>Step {index + 1}</p>
            <RecipeStepsCard data={step}/>
          </div>
        )
      })}
    </div>
  )
}

RecipeStepsContainer.propTypes = {
  recipesData: PropTypes.Array
}

export default RecipeStepsContainer;