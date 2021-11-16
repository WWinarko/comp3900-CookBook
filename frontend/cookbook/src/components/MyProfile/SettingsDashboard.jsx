import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import { Stack } from '@mui/material';
import CustomTextField from '../TextField/CustomTextField';
import FileTextField from '../TextField/FileTextField';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '850px',
    width: '60vw',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
    alignItems: 'center',

    marginTop: '30px',
  },
  title: {
    top: '20px',
    left: '20px',
    position: "relative",

    height: '35px',
    width: '170px',

    textAlign: 'center',

    backgroundColor: '#F9FAF9',

    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: 'bold',

    color: '#89623D',
  },
})

function SettingsDashboard() {
  const classes = useStyles();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    photo: '',
    email: '',
    address: '',
    state: '',
    postcode: '',
    phone: '',
  }) 

  return (
    <div>
      {/* {loadingState
        ? <div style={{ height: '100vh', backgroundColor: '#F9FAF9', paddingTop: '150px', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress/>
          </div>
        : <>  */}
          <div className={classes.title}>
            Settings
          </div>
          <div className={classes.root}>
            <div className={classes.container} >
              <Stack
              >
                <Stack
                  direction="row"
                  sx={{"div:first-child": {
                    marginRight: '55px',
                    },
                  }}
                >
                  <CustomTextField id="firstName" required name="First Name" value={personalInfo['firstName']} setValue={setPersonalInfo}  field="object" width="205px"/>
                  <CustomTextField id="lastName" required name="Last Name" value={personalInfo['lastName']} setValue={setPersonalInfo}  field="object" width="205px"/>
                </Stack>
                <FileTextField id="photo" name="Photo" setValue={setPersonalInfo} field="object" width="466px" accept="image/*"/>
                <CustomTextField id="email" required name="Email" value={personalInfo['email']} setValue={setPersonalInfo}  field="object" width="466px"/>
                <CustomTextField id="phone" required name="Phone" value={personalInfo['phone']} setValue={setPersonalInfo}  field="object" width="466px"/>
                <CustomTextField id="adress" name="Address" value={personalInfo['adress']} setValue={setPersonalInfo}  field="object" width="466px"/>
                <Stack
                  direction="row"
                  sx={{"div:first-child": {
                    marginRight: '55px',
                  },
                  }}
                >
                  <CustomTextField id="state" name="State" value={personalInfo['state']} setValue={setPersonalInfo}  field="object" width="205px"/>
                  <CustomTextField id="postcode" name="Postcode" value={personalInfo['postcode']} setValue={setPersonalInfo}  field="object" width="205px"/>
                </Stack>
              </Stack>
            </div>
          </div>
          {/* </>
      } */}
    </div>
  )
}

export default SettingsDashboard;