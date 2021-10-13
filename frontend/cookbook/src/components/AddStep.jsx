import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomTextField from "../components/TextField/CustomTextField";
import  { AddButton } from "../pages/AddRecipe";

function AddStep({ steps, setSteps, setNewStep }) {
  const [step, setStep] = useState('');
  
  const handleSave = () => {
    if (step !== '') {
      const tempSteps = [...steps, step];
      setSteps(tempSteps);
    }
    setNewStep();

  }
  return (
    <>
    <div>
      <CustomTextField id="newStep" name="New Step" multiline value={step} setValue={setStep} width="781px"/>
    </div>
    <AddButton onClick={handleSave}>Save</AddButton>
    </>
  )
}

AddStep.propTypes = {
  steps: PropTypes.object,
  setSteps: PropTypes.func,
  setNewStep: PropTypes.func
}

export default AddStep;