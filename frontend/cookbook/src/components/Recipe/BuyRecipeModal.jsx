/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import { Typography, Stack } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from 'axios';

import BuyRecipeModalCard from './BuyRecipeModalCard';
import RoundButton from '../RoundButton';


function BuyRecipeModal({ state, setState, recipe }) {
  console.log(recipe);
  const [loadingState, setLoadingState] = useState(true);
  const [ingredientList, setIngredientList] = useState([]);
  
  React.useEffect(() => {
    if (recipe === undefined) {
      setLoadingState(true);
    } else {
      setLoadingState(false);
      setIngredientList(getItems);
    }
  }, [recipe, state])


  
  const handleClose = () => {
    setState(false);
    
  }
  
  const getItems = () => {
    const items = [];
    recipe['ingredients'].map((ingredient) => {
      items.push({
        "_id": ingredient['product_id'], 
        "quantity": ingredient['quantity'],
      })
    })
    return items;
  }

  const addToCart = () => {
    
    const token = localStorage.getItem('cookbook-token')
    axios.post('http://127.0.0.1:5000/cart/add', {
      token,
      "ingredients": getItems()
    })
    .then((res) => {
      console.log(res.data);
      handleClose();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const removeItem = (id) => {
    const newList = ingredientList.filter(item => item['_id'] !== id);
    setIngredientList(newList);
  }

  const changeQuantity = (id,event) => {
    const newList = [...ingredientList];
    newList.map(item => {
      if (item['_id'] === id) {
        item['quantity'] = parseInt(event.target.value);
      }
    });
    setIngredientList(newList);
  }

  return (
    <Drawer anchor="right" open={state} onClose={handleClose} PaperProps={{ sx: {width: '25%', backgroundColor: '#C4C4C4'} }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        sx={{backgroundColor: '#FE793D', color: '#ffffff'}}
      >
        <Typography component="h1" variant="h5" sx={{fontWeight: 600}}>Ingredients</Typography>
        <CancelOutlinedIcon fontSize="large" onClick={handleClose} sx={{cursor: 'pointer'}}/>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        p={2}
      >
        {loadingState
          ? <></>
          : <>
              {ingredientList.map((ingredient) => {
                return (
                  <BuyRecipeModalCard key={ingredient['_id']} id={ingredient['_id']} quantity={ingredient['quantity']} removeItem={removeItem} changeQuantity={changeQuantity}/>
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