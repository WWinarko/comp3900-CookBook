import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const SignInButton = styled(Button)(() => ({
  background: '#F9FAF9',
  color: '#FE793D',
  border: '1px solid #E97048',
  borderRadius: '20px',
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
  textTransform: 'none',
  fontsize: '18px',
  fontWeight: 'bold',
}));

function RoundButton() {
  return (
    <SignInButton variant= "outlined">
      Sign In
    </SignInButton>
  );
}

export default RoundButton;