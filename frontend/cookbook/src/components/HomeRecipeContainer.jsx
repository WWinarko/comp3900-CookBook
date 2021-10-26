import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import HomeRecipeCard from './HomeRecipeCard';

const useStyles = makeStyles(({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

function HomeRecipeContainer({ recipesData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {recipesData.map((recipe, index) => {
        return (
          <HomeRecipeCard data={recipe} key={index} />
        )
      })}
    </div>
  )
}

HomeRecipeContainer.propTypes = {
  recipesData: PropTypes.array,
}

export default HomeRecipeContainer;