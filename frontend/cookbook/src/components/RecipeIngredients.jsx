import React from 'react';
import { makeStyles } from '@mui/styles';

import RoundButton from './RoundButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textHolder: {
    width: '100%',
    height: '41px',
  },
  text: {
    top: '640px',
    position: "absolute",
    
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
  
    color: "#FFFFFF",
  },
  ingredientsText: {
    backgroundColor: '#FFFFFF',
    width: '60%',

    marginTop: '10px',
    marginBottom: '15px',

    fontFamily: 'Roboto',
    fontSize: '14px',
    color: '#89623D',

    lineHeight: '0.4',
  },
});

function RecipeIngredients() {
  const classes = useStyles();

  const buyRecipe = () => {
    console.log('aa');
  }

  return (
    <div className={classes.root}>
      <img src='a' alt='thumbnail' style={{ width:'415px', height:'415px', border:'1px solid', borderRadius:'7px', marginBottom:'20px' }} />

      <div className={classes.text}>Ingredients</div>
      <div className={classes.textHolder}>
        <div style={{ backgroundColor:'#C4C4C4', width: '80%', height:'100%' }} />
        <div style={{ width:'20%' }} />
      </div>
      
      <div className={classes.ingredientsText}>
        <p>3 cups store bought roast chicken</p>
        <p>1 cup corn kernels</p>
        <p>1/2 red onion</p>
        <p>300g cherry tomatoes</p>
        <p>2 cucumbers</p>
        <p>2 avocados</p>
        <p>150g bacon</p>
        <br/>
        <p style={{ fontWeight: 'bold' }}>Dressing</p>
        <p>2 1/2 tbsp cider vinegar</p>
        <p>6 tbsp extra virgin olive oil</p>
        <p>1 garlic clove , minced using garlic press </p>
        <p>1 tsp Dijon Mustard</p>
        <p>2 tsp dried mixed herbs</p>
        <p>1 tsp sugar , optional</p>
        <p>3/4 tsp salt</p>
        <p>1/2 tsp black pepper</p>
      </div>

      <RoundButton name='Buy Recipe' onClick={buyRecipe} />
    </div>
  )
}

export default RecipeIngredients;
