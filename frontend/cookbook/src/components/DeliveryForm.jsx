import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import CustomTextField from './TextField/CustomTextField';
import SquareButton from './SquareButton';

function DeliveryForm() {
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    postcode: '',
    phone: '',
  }) 
  return (
    <Stack direction="column" sx={{width: '100%'}}>
      <Typography component="h2" variant="h4" gutterBottom sx={{color: "#FE793D"}}> Delivery Details</Typography>
      <Stack
        direction="row"
        sx={{"div:first-child": {
          marginRight: '55px',
        }}}
      >
        <CustomTextField id="firstName" required name="First Name" value={deliveryInfo['firstName']} setValue={setDeliveryInfo}  field="object" width="100%"/>
        <CustomTextField id="lastName" required name="Last Name" value={deliveryInfo['lastName']} setValue={setDeliveryInfo}  field="object" width="100%"/>
      </Stack>
      <CustomTextField id="email" required name="Email" value={deliveryInfo['email']} setValue={setDeliveryInfo}  field="object" width="100%"/>
      <CustomTextField id="phone" required name="Phone" value={deliveryInfo['phone']} setValue={setDeliveryInfo}  field="object" width="100%"/>
      <CustomTextField id="adress" required name="Address" value={deliveryInfo['adress']} setValue={setDeliveryInfo}  field="object" width="100%"/>
      <Stack
        direction="row"
        sx={{"div:first-child": {
          marginRight: '55px',
        }, marginBottom: '20px'}}
      >
        <CustomTextField id="state" required name="State" value={deliveryInfo['state']} setValue={setDeliveryInfo}  field="object" width="100%"/>
        <CustomTextField id="postcode" required name="Postcode" value={deliveryInfo['postcode']} setValue={setDeliveryInfo}  field="object" width="100%"/>
      </Stack>
      <SquareButton name="Save"/>
    </Stack>
  )
}

export default DeliveryForm