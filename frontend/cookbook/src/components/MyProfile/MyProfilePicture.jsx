import React from "react";
import { makeStyles } from '@mui/styles';
import { Avatar } from "@mui/material";
import RoundButton from "../RoundButton";

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
  return (
    <div className={classes.root}>
      <Avatar
        alt="Profile Picture"
        src="a"
        sx={{ width:'115px', height: '115px', marginBottom:'30px' }}
      >A</Avatar>
      <RoundButton name="Sign out" />
    </div>
  )
}

export default MyProfilePicture;