import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import RecipeHomeContainer from './RecipeHomeContainer';
import RoundButton from './RoundButton';

const useStyles = makeStyles(({
  root: {
    width: '100%',
    height: '50px',
    alignItems: 'center',
  },
  textHolder: {
    width: '583px',
    height: '41px',
    left: '0px',
    top: '507px',
    textAlign: 'right',
    background: '#C4C4C4',
  },
  text: {
    paddingTop: '6px',
    paddingRight: '100px',
  
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
  
    color: "#FFFFFF",
  },
  container: {
    width: '100%',
    backgroundColor: '#F9FAF9',

    paddingTop: '20px',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
  },
}));

function HomeRecipe() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState(['1']);
  const [count, setCount] = useState(1);

  const showMore = () => {
    setCount(count + 1);
    const newRecipes = [...recipes, count + 1];
    setRecipes(newRecipes);
  }

  return (
    <div className={classes.root}>
      <div className={classes.textHolder}>
        <div className={classes.text}>Popular This Week</div>
      </div>
      <div className={classes.container}>
        {recipes.map((recipe, index) => {
          return (
            <RecipeHomeContainer tes={recipe} key={index}/>
          )

        })}
        <RoundButton name='Show More' onClick={showMore} />
      </div>
    </div>
  )
}

export default HomeRecipe;