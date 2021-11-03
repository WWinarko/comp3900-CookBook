import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Stack, Typography, Button, } from "@mui/material";
import { styled } from '@mui/material/styles';

import CustomTextField from "../components/TextField/CustomTextField";
import Navbar from '../components/Navbar';
import FileTextField from "../components/TextField/FileTextField";
import RoundButton from "../components/RoundButton";
import Notification from "../components/Notification";


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


function AddProduct() {
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const [productInfo, setProductInfo] = useState(
    {
      productName: '',
      photo: '',
      description: '',
    });

  const sendToBack = () => {
    const productBody = {
      token: localStorage.getItem('cookbook-token'),
      title: productInfo.productName,
      photo: productInfo.photo,
      description: productInfo.description,
      labels: ''
    }
    axios.post('http://127.0.0.1:5000/product/add', productBody)
    .then((res) => {
      console.log(res.data['product_id']);
      history.push('/');
    })
    .catch((err) => {
      setNotify({
        isOpen: true,
        message: err.response.data.message,
        type: 'error',
      });
    })
  }

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} /> 
      <Navbar />
      <Stack
        direction="column"
        alignItems="center"
        pt={20}
        sx={{backgroundColor: '#F9FAF9', height: '100%'}}>
        <Typography component="h1" variant="h3" sx={{color: "#FE793D", marginBottom: '36px'}}>Add Product</Typography>
        <Stack
          direction="column"
          alignItems="flex-start"
        >
          <CustomTextField id="productName" name="Product Name" value={productInfo['productName']} setValue={setProductInfo} field="object" width="781px"/>
          <FileTextField id="photo" name="Photo" value={productInfo['photo']} setValue={setProductInfo} field="object" width="781px" accept="image/*"/>
          <CustomTextField id="description" name="Description" multiline value={productInfo['description']} setValue={setProductInfo} field="object" width="781px"/>
        </Stack>
        <div style={{ marginBottom: '20px'}}>
          <RoundButton name="Add Product" onClick={sendToBack}/>
        </div>
      </Stack>
    </>
  )
}

export default AddProduct;