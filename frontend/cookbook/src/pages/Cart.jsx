import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Paper, Button, CircularProgress, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Navbar from '../components/Navbar';
import Checkout from '../components/Checkout';
import CartCard from '../components/CartCard';
import DeliveryForm from '../components/DeliveryForm';
import Notification from '../components/Notification';

const ContinueButton = styled(Button)(() => ({
  color: "#89623D",
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '500',
}));

function Cart() {
  const token = localStorage.getItem('cookbook-token');
  const history = useHistory();
  const [checkout, setCheckout] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [update, setUpdate] = useState(false);
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

  useEffect(() => {
    console.log(update);
    const auth = {"Authorization": `Bearer ${token}`};
    axios.get('http://127.0.0.1:5000/cart/retrieve', {headers: auth})
    .then((res) => {
      const {ingredients, total} = res.data;
      console.log(res.data);
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
  }, [checkout, update])
  
  const goHome = () => {
    history.push('/');
  }
  const removeIngredient = (id) => {
    axios.post('http://127.0.0.1:5000/cart/remove', {
      token,
      'ingredients': id,
    })
    .then(() => {
      setLoading(true);
      setUpdate(!update);
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message || 'Connection Error',
        type: 'error',
      });
    })
  }
  const changeQuantity = (id,event) => {
    const newList = [...ingredients];
    newList.map(item => {
      if (item['id'] === id) {
        item['quantity'] = parseInt(event.target.value);
      }
    });
    setIngredients(newList);
  }
  
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
        {checkout ? 
          <Paper sx={{width: "30%", padding: '20px', height: '80%'}}><DeliveryForm deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo}/></Paper> 
        :
          loading ? <CircularProgress sx={{position: 'relative', top: '20%'}}/> 
          : 
          <Paper sx={{width: "30%", padding: '20px', height: '80%'}}>
          <Typography component="h2" variant="h4" gutterBottom sx={{color: "#FE793D"}}>My Cart</Typography>
            {ingredients.map(ingredient => <CartCard removeIngredient={removeIngredient} ingredient={ingredient} key={ingredient['id']} changeQuantity={changeQuantity} />)}
          </Paper>
          }
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

