import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import RoundButton from './RoundButton';
import HomeRecipeContainer from './HomeRecipeContainer';
import { CircularProgress } from '@mui/material';

const useStyles = makeStyles(({
  root: {
    width: '100%',
    alignItems: 'center',
  },
  textHolder: {
    width: '31%',
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
  const [allRecipes, setAllRecipes] = useState([])
  const [recipes, setRecipes] = useState([]);
  const [done, setDone] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/listall', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
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
      <div className={classes.textHolder}>
        <div className={classes.text}>Popular This Week</div>
      </div>
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

export default HomeRecipe;