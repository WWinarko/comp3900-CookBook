import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    height: '250px',
    width: '250px',
  },
})

function MyProfilePicture() {
  const classes = useStyles();
  return (
    <div className={classes.root}>

    </div>
  )
}

export default MyProfilePicture;