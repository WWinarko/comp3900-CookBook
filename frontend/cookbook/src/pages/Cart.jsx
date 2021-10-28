import React, { useState } from 'react';
import { Stack, Paper, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Navbar from '../components/Navbar';
import Checkout from '../components/Checkout';
import DeliveryForm from '../components/DeliveryForm';

const ContinueButton = styled(Button)(() => ({
  color: "#89623D",
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '500',
}));

function Cart() {
  const [checkout, setCheckout] = useState(false);
  const history = useHistory();
  const goHome = () => {
    history.push('/');
  }

  return (
    <>
      <Navbar />
      <Stack
        direction="row"
        justifyContent="center"
        pt={25}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9', height: '84vh' }}
      >
        {checkout ? <Paper sx={{width: "30%", padding: '20px', height: '80%'}}><DeliveryForm /></Paper> : <Paper sx={{width: "30%", padding: '20px', height: '80%'}}></Paper>}
        <Stack direction="column" sx={{width: "20%"}}>
          <ContinueButton endIcon={<ArrowForwardIosIcon />} sx={{alignSelf: 'flex-end', paddingTop: 0, marginBottom: '20px'}} onClick={goHome}>Continue Shopping</ContinueButton>
          <Checkout checkout={checkout} setCheckout={setCheckout}/>
        </Stack>
      </Stack>
    </>
  );
}

export default Cart;

