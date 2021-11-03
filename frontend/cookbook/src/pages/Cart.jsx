import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Paper, Button, CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Navbar from '../components/Navbar';
import Checkout from '../components/Checkout';
import DeliveryForm from '../components/DeliveryForm';
import Notification from '../components/Notification';

const ContinueButton = styled(Button)(() => ({
  color: "#89623D",
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '500',
}));

function Cart() {
  const [checkout, setCheckout] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [ingredients, setIngredients] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe@example.com',
    address: '23 Anzac Parade',
    state: 'NSW',
    postcode: '2033',
    phone: '04123456789',
  })
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const history = useHistory();
  const goHome = () => {
    history.push('/');
  }
  useEffect(() => {
    const token = localStorage.getItem('cookbook-token');
    const auth = {"Authorization": `Bearer ${token}`};
    axios.get('http://127.0.0.1:5000/cart/retrieve', {headers: auth})
    .then((res) => {
      const {ingredients, total} = res.data;
      console.log(ingredients);
      setIngredients(ingredients);
      setTotal(total);
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message || 'Connection Error',
        type: 'error',
      });
    })
    .finally(() => {
      setLoading(false);
    })
  }, [checkout])
  
  return (
    <>
      <Navbar />
      <Notification notify={notify} setNotify={setNotify} /> 
      <Stack
        direction="row"
        justifyContent="center"
        pt={25}
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9', height: '84vh' }}
      >
        {checkout ? <Paper sx={{width: "30%", padding: '20px', height: '80%'}}><DeliveryForm deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo}/></Paper> : <Paper sx={{width: "30%", padding: '20px', height: '80%'}}></Paper>}
        <Stack direction="column" sx={{width: "20%"}}>
          {loading ? <CircularProgress sx={{position: 'relative', left: '50%', top: '20%'}}/> :
            <>
              <ContinueButton endIcon={<ArrowForwardIosIcon />} sx={{alignSelf: 'flex-end', paddingTop: 0, marginBottom: '20px'}} onClick={goHome}>Continue Shopping</ContinueButton>
              <Checkout checkout={checkout} setCheckout={setCheckout} total={total} ingredients={ingredients} deliveryInfo={deliveryInfo}/>
            </>
          }
        </Stack>
      </Stack>
    </>
  );
}

export default Cart;

