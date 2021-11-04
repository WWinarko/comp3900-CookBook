import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';

import PreferenceDialog from '../components/PreferenceDialog';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import HomeRecipeContainer from '../components/HomeRecipeContainer';


function Recommendation() {
  const [open, setOpen] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  return (
    <>
      <Navbar />
      <Notification notify={notify} setNotify={setNotify} />
      <PreferenceDialog open={open} setOpen={setOpen} setRecipes={setRecipes}/>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        pt={15}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9', height: '90vh' }}
      >
        <Typography component="h2" variant="h4" gutterBottom sx={{color: "#FE793D"}}>Recommendation</Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap', width: '60%'}}>
          <HomeRecipeContainer recipesData={recipes} />
        </Box>
      </Stack>
    </>
  )
}

export default Recommendation;