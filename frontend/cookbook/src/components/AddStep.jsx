import React, { useState } from 'react';
import CustomTextField from "../components/TextField/CustomTextField";
import  { AddButton } from "../pages/AddRecipe";

function AddStep(steps, setSteps, setNewStep) {
  const [step, setStep] = useState('');
  
  const handleSave = () => {
    if (step !== '') {
      setSteps([steps, step]);
    }
    setNewStep();

  }
  return (
    <>
      <CustomTextField id="newStep" name="New Step" multiline value={step} setValue={setStep} width="781px"/>
      <AddButton onClick={handleSave}>Save</AddButton>
    </>
  )
}

export default AddStep;