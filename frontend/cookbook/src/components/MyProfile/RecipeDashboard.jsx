import React from "react";
import { makeStyles } from '@mui/styles';
import RecipeCard from "./RecipeCard";
import { Pagination } from "@mui/material";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '850px',
    width: '90%',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  container: {
    width: '100%',

    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    margin: '30px',
  }
})

function RecipeDashboard() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.title}>
        Recipes
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
        {/* <Pagination count={10} page={page} onChange={handleChange} /> */}
        <Pagination count={10} />
      </div>
    </div>
  )
}

export default RecipeDashboard;