import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import HomeRecipeContainer from './HomeRecipeContainer';
import RoundButton from './RoundButton';
import { RecipeData } from './RecipeData';

const useStyles = makeStyles(({
  root: {
    width: '100%',
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
    paddingBottom: '20px',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
  },
}));

function HomeRecipe() {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [recipes, setRecipes] = useState([RecipeData.properties.slice(0, 4)]);
  const [done, setDone] = useState(false);

  const showMore = () => {
    const newRecipes = [...recipes, RecipeData.properties.slice(count * 4, (count + 1) * 4)];

    setCount(count + 1);
    setRecipes(newRecipes);
    
    if (RecipeData.properties.length < (count + 1) * 4) {
      setDone(!done);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.textHolder}>
        <div className={classes.text}>Popular This Week</div>
      </div>
      <div className={classes.container}>
        {recipes.map((recipes, index) => {
          return (
            <HomeRecipeContainer recipesData={recipes} key={index}/>
          )
        })}
        {done
          ? <></>
          : <RoundButton name='Show More' onClick={showMore} />
        }
      </div>
    </div>
  )
}

export default HomeRecipe;