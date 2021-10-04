/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const SignInButton = styled(Button)(() => ({
  backgroundColor: '#89623D',
  color: "#ffffff",
  borderRadius: '3px',
  border: 'none',
  width: '151px',
  height: '45px',
  '&:hover': {
    backgroundColor: '#89623D',
  },
  textTransform: 'none',
  fontsize: '18px',
  fontWeight: '500',
}));

function RoundButton({ name }) {
  return (
    <SignInButton variant= "outlined">
      {name}
    </SignInButton>
  );
}

export default RoundButton;