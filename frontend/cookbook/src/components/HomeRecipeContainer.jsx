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

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/view?recipe_id=61656c4cc6b71dc62b6aa9ca', {
      method: 'GET',
    }).then((data) => {
      data.json().then((res) => {
        console.log(res);
      })
    })
  })

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
  recipesData: PropTypes.Array
}

export default HomeRecipeContainer;