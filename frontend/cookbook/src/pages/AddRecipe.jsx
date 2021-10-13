import React, { useState } from "react";
import { Stack, Typography, InputAdornment, FormLabel, Button, } from "@mui/material";
import { styled } from '@mui/material/styles';

import CustomTextField from "../components/TextField/CustomTextField";
import NumberTextField from "../components/TextField/NumberTextField";
import Navbar from '../components/Navbar';
import FileTextField from "../components/TextField/FileTextField";
import IngredientCard from "../components/IngredientCard";
import RecipeStepsContainer from '../components/RecipeStepsContainer';
import { RecipeData } from '../components/RecipeData';
import AddStep from "../components/AddStep";

export const AddButton = styled(Button)(() => ({
  backgroundColor: '#89623D',
  color: "#ffffff",
  borderRadius: '3px',
  border: 'none',
  padding: '10px 16px',
  '&:hover': {
    backgroundColor: '#89623D',
  },
  textTransform: 'none',
  fontSize: '16px',
  margin: '16px 0',
}));


function AddRecipe() {
  const [recipeInfo, setRecipeInfo] = useState(
    {
      recipeName: '',
      photo: '',
      description: '',
      prepTime: 1,
      cookTime: 1,
      difficulty: 1,
      serves: 1,
    });
  // const [ingredients, setIngredients] = ([]);
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState(false);

  const handleIngredients = () => {
    console.log("added");
  }
  const handleNewStep = () => {
    setNewStep(!newStep);
  }

  return (
    <>
      <Navbar />
      <Stack
        direction="column"
        alignItems="center"
        pt={20}
        sx={{backgroundColor: '#F9FAF9', height: '100%'}}>
        <Typography component="h1" variant="h3" sx={{color: "#FE793D", marginBottom: '36px'}}>Add Recipe</Typography>
        <Stack
          direction="column"
          alignItems="flex-start"
        >
          <CustomTextField id="recipeName" name="Recipe Name" value={recipeInfo['recipeName']} setValue={setRecipeInfo} field="object" width="781px"/>
          <FileTextField id="photo" name="Photo" value={recipeInfo['photo']} setValue={setRecipeInfo} field="object" width="781px" accept="image/*"/>
          <CustomTextField id="description" name="Description" multiline value={recipeInfo['description']} setValue={setRecipeInfo} field="object" width="781px"/>
          <Stack
            direction="row"
            sx={{width: '781px'}}
            justifyContent="space-between"
          >
            <NumberTextField id="prepTime" name="Prep Time" value={recipeInfo['prepTime']} setValue={setRecipeInfo} field="object" width="100px" min="1" endAdornment={<InputAdornment position="end">min</InputAdornment>}/>
            <NumberTextField id="cookTime" name="Cook Time"  value={recipeInfo['cookTime']} setValue={setRecipeInfo} field="object" width="100px" min="1" endAdornment={<InputAdornment position="end">min</InputAdornment>}/>
            <NumberTextField id="difficulty" name="Difficulty" value={recipeInfo['difficulty']} setValue={setRecipeInfo} field="object" width="70px" min="1" max="5"/>
            <NumberTextField id="serves" name="Serves" value={recipeInfo['serves']} setValue={setRecipeInfo} field="object" width="70px" min="1" />
          </Stack>
          <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginTop: '15px' }}>Ingredients</FormLabel>
          <IngredientCard />
          <AddButton onClick={handleIngredients}> Add ingredient </AddButton>
          <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500', marginTop: '15px' }}>Steps</FormLabel>
          <RecipeStepsContainer recipesData={[RecipeData.properties[0]]} />
          {newStep ? <AddStep steps={steps} setSteps={setSteps} newStep={newStep} setNewStep={() => setNewStep(false)}/> : <AddButton onClick={handleNewStep}> Add step </AddButton>}
        </Stack>
      </Stack>
    </>
  )
}

export default AddRecipe;