import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    width: '70%',
    height: '200px',
    marginTop: '75px',
  }
})

function UserInfo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      
    </div>
  )
}

export default UserInfo;