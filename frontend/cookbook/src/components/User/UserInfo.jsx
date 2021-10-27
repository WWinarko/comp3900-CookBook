import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Divider, Rating } from '@mui/material';

import SquareButton from '../SquareButton';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    height: '200px',
    marginTop: '75px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '45%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    marginRight: '10%',
  },
})

function UserInfo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div style={{ marginRight: '10%' }}> 
          <Avatar 
          alt="Profile Picture"
          src="a"
          sx={{ width:'125px', height: '125px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ color:'#FE793D', fontWeight:'bold', fontSize: '24px' }}>User</div>
          <div style={{ color:'#89623D', display: 'flex' }}>
            <p style={{ marginRight: '50px' }}>Followers: 110</p>
            <p>Posts: 123</p>
          </div>
          <SquareButton name="Follow" />
        </div>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor:'#FE793D', }}/>
      <div className={classes.container}>
        <div>
          <div style={{ color:'#FE793D', fontWeight:'bold', fontSize: '24px' }}>Average Rating</div>
          <Rating 
            value={5} 
            readOnly 
            sx={{ margin: '10px', fontSize:'2.5rem' }}
            size={"large"}
          />
        </div>
      </div>
    </div>
  )
}

export default UserInfo;