import React from "react";
import { makeStyles } from '@mui/styles';

import { Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import UserInfo from "../components/User/UserInfo";

const useStyles = makeStyles({
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '30px',
  
    color: '#FE793D',
  },
})

function User() {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Stack
        p={10}
        sx={{ backgroundColor:'#F9FAF9' }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing = {5}
          sx={{ width: '100%' }}
        >
          <UserInfo />
          <p className={classes.header}>Most Popular</p>
          
        </Stack>
      </Stack>
    </div>
  )
}

export default User;