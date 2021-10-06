import React, { useState } from "react";
import { Stack, Typography, InputAdornment} from "@mui/material"; 

import CustomTextField from "../components/TextField/CustomTextField";
import NumberTextField from "../components/TextField/NumberTextField";
import Navbar from '../components/Navbar';
import FileTextField from "../components/TextField/FileTextField";

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
  // const [steps, setSteps] = ([]);

  return (
    <>
      <Navbar />
      <Stack
        direction="column"
        alignItems="center"
        pt={20}
        sx={{backgroundColor: '#F9FAF9', height: '87vh'}}>
        <Typography component="h1" variant="h3" sx={{color: "#FE793D", marginBottom: '36px'}}>Add Recipe</Typography>
        <Stack
          direction="column"
          alignItems="flex-start"
        >
          <CustomTextField id="recipeName" name="Recipe Name" value={recipeInfo['recipeName']} setValue={setRecipeInfo} field="object" width="600px"/>
          <FileTextField id="photo" name="Photo" value={recipeInfo['photo']} setValue={setRecipeInfo} field="object" width="600px" accept="image/*"/>
          <CustomTextField id="description" name="Description" multiline value={recipeInfo['description']} setValue={setRecipeInfo} field="object" width="600px"/>
          <Stack
            direction="row"
            sx={{width: '600px'}}
            justifyContent="space-between"
          >
            <NumberTextField id="prepTime" name="Prep Time" value={recipeInfo['prepTime']} setValue={setRecipeInfo} field="object" width="100px" min="1" endAdornment={<InputAdornment position="end">min</InputAdornment>}/>
            <NumberTextField id="cookTime" name="Cook Time"  value={recipeInfo['cookTime']} setValue={setRecipeInfo} field="object" width="100px" min="1" endAdornment={<InputAdornment position="end">min</InputAdornment>}/>
            <NumberTextField id="difficulty" name="Difficulty" value={recipeInfo['difficulty']} setValue={setRecipeInfo} field="object" width="70px" min="1" max="5"/>
            <NumberTextField id="serves" name="Serves" value={recipeInfo['serves']} setValue={setRecipeInfo} field="object" width="70px" min="1" />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default AddRecipe;