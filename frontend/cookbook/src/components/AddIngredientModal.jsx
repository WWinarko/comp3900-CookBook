import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Modal, Box, FormLabel } from "@mui/material";
import CustomTextField from "./TextField/CustomTextField";
import SearchBar from "./SearchBar";
import SquareButton from "./SquareButton";

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

function AddIngredientModal({ open, onClose }) {
  const [name, setName] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} >
        <CustomTextField id="ingredientName" name="Name" value={name} setValue={setName} width="400px"/>
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>Ingredient</FormLabel>
          <SearchBar width="375px" placeholder="Search Ingredient" border="1px solid black" />
        </div>
        <SquareButton name="Confirm"/>
      </Box>
    </Modal>
  )
}

AddIngredientModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default AddIngredientModal;