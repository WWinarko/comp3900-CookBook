/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { useHistory } from 'react-router-dom';

import Notification from './Notification';

function AccountMenu({anchorEl, open, onClose, onClick}) {
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
  const handleAddProduct = () => {
    history.push('/product/add');
  }

  const handleProfile = () => {
    console.log('push /user/selfid');
  }

  const handleAccount = () => {
    history.push('/profile');
  }
  return (
    <>
      <Notification notify={notify} setNotify={setNotify} /> 
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        onClick={onClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 0.5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleAddProduct}>
          Add product
        </MenuItem>
        <MenuItem onClick={handleProfile}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleAccount}>
          Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;