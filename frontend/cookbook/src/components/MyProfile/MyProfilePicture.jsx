import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Avatar } from "@mui/material";
import RoundButton from "../RoundButton";
import { useHistory } from 'react-router-dom';

import Notification from "../Notification";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    height: '250px',
    width: '250px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
})

function MyProfilePicture() {
  const classes = useStyles();
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: 'error',
  });

  const handleLogout = () => {
    const token = localStorage.getItem('cookbook-token');
    axios.post('http://127.0.0.1:5000/auth/logout', {
        token,
      })
      .then((res) => {
        const {is_success} = res.data;
        if(is_success) {
          localStorage.removeItem('cookbook-token');
          history.push('/');
        } else {
          setNotify({
            isOpen: true,
            message: "Invalid token",
            type: 'error',
          });
        }
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
    <div className={classes.root}>
      <Notification notify={notify} setNotify={setNotify} /> 
      <Avatar
        alt="Profile Picture"
        src="a"
        sx={{ width:'120px', height: '120px', marginBottom:'30px' }}
      >A</Avatar>
      <RoundButton name="Sign out" onClick={handleLogout} />
    </div>
  )
}

export default MyProfilePicture;