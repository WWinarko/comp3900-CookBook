import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { CircularProgress } from '@mui/material';
import HomeRecipeContainer from '../HomeRecipeContainer';
import RoundButton from '../RoundButton';

const useStyles = makeStyles(({
  root: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '30px',
  
    color: '#FE793D',
  },
  container: {
    width: '100%',
    backgroundColor: '#F9FAF9',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
  },
}));

function UserRecipe() {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [allRecipes, setAllRecipes] = useState([])
  const [recipes, setRecipes] = useState([]);
  const [done, setDone] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/listall', {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAllRecipes(res.recipe_list);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [])

  React.useEffect(() => {
    setRecipes([allRecipes.slice(0, 4)]);
  }, [allRecipes]);

  const showMore = () => {
    const newRecipes = [...recipes, allRecipes.slice(count * 4, (count + 1) * 4)];

    setCount(count + 1);
    setRecipes(newRecipes);
    
    if (allRecipes.length < (count + 1) * 4) {
      setDone(!done);
    }
  }

  return (
    <div className={classes.root}>
      <p className={classes.header}>Recipes</p>

      {loadingState
        ? <div style={{ height: '30vh', backgroundColor: '#F9FAF9', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        : <div className={classes.container}>
          {recipes.map((recipe, index) => {
            return (
              <HomeRecipeContainer recipesData={recipe} key={index} />
            )
          })}
          {done
            ? <></>
            : <RoundButton name='Show More' onClick={showMore} />
          }
        </div>
      }
    </div>
  )
}

export default UserRecipe;