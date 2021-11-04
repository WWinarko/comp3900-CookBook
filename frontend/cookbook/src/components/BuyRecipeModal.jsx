import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { Typography, Stack } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import axios from 'axios';

import BuyRecipeModalCard from './BuyRecipeModalCard';
import RoundButton from './RoundButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    padding: '5px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#C4C4C4',
  },
})

function BuyRecipeModal({ state, setState, recipe }) {
  const classes = useStyles();
  console.log(recipe);
  const [loadingState, setLoadingState] = useState(true);

  React.useEffect(() => {
    if (recipe === undefined) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
    }
  }, [recipe])

  const handleClose = () => {
    setState(false);
  }

  const addToCart = () => {
    // const token = localStorage.getItem('cookbook-token')
    // axios.post('http://127.0.0.1:5000/cart/add', {
    //   token,
    // })
    return;
  }

  return (
    <Drawer anchor="right" open={state} onClose={handleClose} sx={{width: '520px'}}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{padding: '20px', backgroundColor: '#FE793D', color: '#ffffff'}}
        >
          <Typography component="h1" variant="h5" sx={{fontWeight: 600}}>Ingredients</Typography>
          <CancelOutlinedIcon fontSize="large"/>
        </Stack>
        <Stack className={classes.root}>
          {loadingState
            ? <></>
            : <>
                {recipe.ingredient_string.map((ingredient, index) => {
                  return (
                    <BuyRecipeModalCard key={index} name={ingredient} />
                  )
                })}
              </>
          }  
          <RoundButton name="Add to Cart" onClick={addToCart} />
        </Stack>
      </Drawer>
)
}

BuyRecipeModal.propTypes = {
  state: PropTypes.bool,
  setState: PropTypes.func,
  recipe: PropTypes.object,
}

export default BuyRecipeModal;