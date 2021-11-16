import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import RecipeCard from './RecipeCard';
import { CircularProgress, Pagination } from '@mui/material';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '850px',
    width: '60vw',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: '30px',
  },
  title: {
    top: '20px',
    left: '20px',
    position: "relative",

    height: '35px',
    width: '170px',

    textAlign: 'center',

    backgroundColor: '#F9FAF9',

    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: 'bold',

    color: '#89623D',
  },
})

function RecipeDashboardUser() {
  const classes = useStyles();
  const [allRecipes, setAllRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [id, setId] = useState();

  React.useEffect(() => {
    const newRecipes = allRecipes.slice((page - 1) * 3, page * 3);
    setRecipes(newRecipes);
  }, [allRecipes])

  React.useEffect(() => {
    const newRecipes = allRecipes.slice((page - 1) * 3, page * 3);
    setRecipes(newRecipes);
  }, [page])

  const handlePage = (event, value) => {
    setPage(value);
  }

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/id/check', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setId(res.id);
        })
      }
    })
  }, [])

  React.useEffect(() => {
    if (typeof id === "string") {
      fetch('http://127.0.0.1:5000/profile/view?user_id=' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
          Accept: 'applicaton/json',
          'Content-Type': 'application/json'
        },
      }).then((data) => {
        if (data.status === 200) {
          data.json().then((res) => {
            setAllRecipes(res.user_recipes_string);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoadingState(false);
      })
    }
  }, [id])

  return (
    <div>
      {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress/>
          </div>
        : <> 
          <div className={classes.title}>
            Recipes
          </div>
          <div className={classes.root}>
            <div className={classes.container} >
              {recipes.map((data, index) => {
                return (
                    <RecipeCard key={index} id={data} />
                )
              })}
            </div>
            <Pagination count={Math.ceil(allRecipes.length / 3)} page={page} onChange={handlePage} />
          </div>
          </>
      }
    </div>
  )
}

export default RecipeDashboardUser;