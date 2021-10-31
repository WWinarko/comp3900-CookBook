/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid, Button, Divider, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

import PaypalButton from './PaypalButton';
import Notification from './Notification';
import {ReactComponent as PaypalLogo} from '../assets/paypal-logo.svg';

function Checkout({checkout, setCheckout}) {
  const [payment, setPayment] = useState('reward');
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const subtotal = 17.00;
  const postage = 10.00;
  const total = subtotal + postage;

  const CheckoutButton = styled(Button)(() => ({
    backgroundColor: '#89623D',
    color: "#ffffff",
    borderRadius: '3px',
    border: 'none',
    width: '340px',
    '&:hover': {
      backgroundColor: '#89623D',
    },
    textTransform: 'none',
    fontSize: '18px',
    fontWeight: '500',
    marginTop: '30px',
  }));
  const handlePaymentRadio = (event) => {
    console.log(event.target.value);
    setPayment(event.target.value);
  };
  const handlepaymentSuccess = () => {
    console.log("Payment Success");
    setNotify({
      isOpen: true,
      message: "Payment Success, Please check your email for the invoice",
      type: 'success',
    });
  }
  return (
    <Paper elevation={3} sx={{width: '90%', display: 'flex', justifyContent: 'center',flexDirection: 'column', padding: "60px 40px"}}>
      <Notification notify={notify} setNotify={setNotify} /> 
      <Grid container spacing={2} >
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="left" sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>Sub-total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="right" sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>$ {subtotal}.00</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="left"  sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>Postage</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="right"  sx={{color: "#FE793D", fontWeight: "lighter", fontSize: "1.25rem"}}>$ {postage}.00</Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" flexItem sx={{margin: '10px 0'}}/>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="left"  sx={{color: "#FE793D",  fontWeight: "bold", fontSize: "1.75rem"}}>Total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant="h5" gutterBottom align="right" sx={{color: "#FE793D",  fontWeight: "bold", fontSize: "1.75rem"}}>$ {total}.00 </Typography>
        </Grid>
      </Grid>
      {!checkout ? <CheckoutButton sx={{width: '100%'}} onClick={() => setCheckout(true)}>Proceed to Checkout</CheckoutButton>
      :
      <>
        <Typography paragraph variant="h5" gutterBottom sx={{color: "#767676", alignSelf: 'flex-start'}}>Payment Methods</Typography>
        <RadioGroup value={payment} onChange={handlePaymentRadio}>
          <FormControlLabel value="paypal" control={<Radio />} label={<PaypalLogo />} sx={{width: "150px"}}/>
          <FormControlLabel value="reward" control={<Radio />} label="Reward Cash" sx={{color: "#767676", width: "150px"}}/>
        </RadioGroup>
        {payment === 'paypal' ? <PaypalButton total={total} onSuccess={handlepaymentSuccess}/> : <CheckoutButton sx={{width: '100%'}} onClick={() => setCheckout(false)}>Pay Now</CheckoutButton>}
      </> 
      }
    </Paper>
  )
}

export default Checkout;

Checkout.propTypes = {
  checkout: PropTypes.bool,
  setCheckout: PropTypes.func,
}
