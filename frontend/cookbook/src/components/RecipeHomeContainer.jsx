import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import RecipeHomeCard from './RecipeHomeCard';

const useStyles = makeStyles(({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

function RecipeHomeContainer({ recipesData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {recipesData.map((recipe, index) => {
        return (
          <RecipeHomeCard data={recipe} key={index} />
        )
      })}
    </div>
  )
}

RecipeHomeContainer.propTypes = {
  recipesData: PropTypes.Array
}

export default RecipeHomeContainer;