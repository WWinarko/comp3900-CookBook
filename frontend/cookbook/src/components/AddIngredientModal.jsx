import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Box, FormLabel } from "@mui/material";
import CustomTextField from "./TextField/CustomTextField";
import SearchBar from "./SearchBar";
import SquareButton from "./SquareButton";
import IngredientModalCard from "./IngredientModalCard";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
};

function AddIngredientModal({ open, onClose, ingredients, setIngredients }) {
  const [name, setName] = useState('');
  console.log(ingredients);
  const handleIngredient = () => {
    const body = {
      ingredient: name,
      product_id: "asd",
    }
    setIngredients([...ingredients, body]);
    setName('');
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} >
        <CustomTextField id="ingredientName" name="Name" value={name} setValue={setName} width="400px"/>
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Ingredient</FormLabel>
          <SearchBar width="375px" placeholder="Search Ingredient" border="1px solid black" />
        </div>
        <div>
          <IngredientModalCard />
        </div>
        <SquareButton name="Confirm" onClick={handleIngredient}/>
      </Box>
    </Modal>
  )
}

AddIngredientModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  ingredients: PropTypes.array,
  setIngredients: PropTypes.func,
}

export default AddIngredientModal;