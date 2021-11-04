import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

function UserInfo({ user }) {
  const classes = useStyles();
  const [self, setSelf] = useState(false);

  React.useEffect(() => {
    if (user.email === "") {
      setSelf(false);
    } else {
      setSelf(true);
    }
  }, [])
  

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div style={{ marginRight: '10%' }}> 
          <Avatar 
          alt={user.first_name}
          src={user.photo}
          sx={{ width:'125px', height: '125px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ color:'#FE793D', fontWeight:'bold', fontSize: '24px' }}>{user.first_name} {user.last_name}</div>
          <div style={{ color:'#89623D', display: 'flex' }}>
            <p style={{ marginRight: '50px' }}>Followers: {user.follower}</p>
          </div>
          {self
            ? <div style={{ color:'#89623D', display: 'flex' }}>
                <p style={{ marginRight: '50px' }}>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
              </div>
            : <SquareButton name="Follow" />
          }
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

UserInfo.propTypes = {
  user: PropTypes.object,
}

export default UserInfo;