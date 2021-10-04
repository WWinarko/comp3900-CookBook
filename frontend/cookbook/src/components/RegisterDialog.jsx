/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dialog,DialogActions, DialogContent, DialogTitle, Stack} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CustomTextField from './CustomTextField';
import SquareButton from './SquareButton';


const dialogTheme = createTheme({
  components: {
    // Name of the component
    MuiDialog: {
      styleOverrides: {
        // Name of the slot
        paper: {
          backgroundColor: '#F9FAF9',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '42px 223px',
        },
      },
    },
  },
});

function RegisterDialog({open, setOpen}) {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    postcode: '',
    phone: '',
    dob: '',
  }) 

  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [next, setNext] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return(
    <ThemeProvider theme={dialogTheme}>
      <Dialog 
        open={open} 
        onClose={handleClose}
      > 
        <DialogTitle sx={{color: '#FE793D', fontSize: '2rem'}}>Register</DialogTitle>
        <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center"}}>
        {!next ? 
          <>
            <Stack
              direction="row"
              sx={{"div:first-child": {
                marginRight: '55px',
              },
              }}
            >
              <CustomTextField id="firstName" name="First Name" value={personalInfo['firstName']} setValue={setPersonalInfo}  width="205px"/>
              <CustomTextField id="lastName" name="Last Name" value={personalInfo['lastName']} setValue={setPersonalInfo}  width="205px"/>
            </Stack>
            <CustomTextField id="email" name="Email" value={personalInfo['email']} setValue={setPersonalInfo}  width="466px"/>
            <CustomTextField id="adress" name="Address" value={personalInfo['adress']} setValue={setPersonalInfo}  width="466px"/>
            <Stack
              direction="row"
              sx={{"div:first-child": {
                marginRight: '55px',
              },
              }}
            >
              <CustomTextField id="state" name="State" value={personalInfo['state']} setValue={setPersonalInfo}  width="205px"/>
              <CustomTextField id="postcode" name="Postcode" value={personalInfo['postcode']} setValue={setPersonalInfo}  width="205px"/>
            </Stack>
            <Stack
              direction="row"
              sx={{"div:first-child": {
                marginRight: '55px',
              },
              }}
            >
              <CustomTextField id="phone" name="Phone" value={personalInfo['phone']} setValue={setPersonalInfo}  width="205px"/>
              <CustomTextField id="dob" name="Date of Birth" value={personalInfo['dob']} setValue={setPersonalInfo}  width="205px"/>
            </Stack>
          </> 
        :
          <>
            <CustomTextField id="username" name="Username" value={accountInfo['username']} setValue={setAccountInfo}  width="466px"/>
            <CustomTextField id="password" name="Password" value={accountInfo['password']} setValue={setAccountInfo}  width="466px"/>
            <CustomTextField id="confirmPassword" name="Confirm Password" value={accountInfo['confirmPassword']} setValue={setAccountInfo}  width="466px"/>
          </>
        }
          
          
        </DialogContent>
        <DialogActions>
            {!next ?
              <SquareButton name="Next" onClick={() => setNext(true)}/>
            :
              <>
                <SquareButton name="Back" onClick={() => setNext(false)} />
                <SquareButton name="Register" />
              </>
            }
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )

}

export default RegisterDialog;