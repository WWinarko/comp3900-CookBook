import React from 'react';
import logo from '../assets/Cookbook.png';
import '../App.css';
import Grid from '@mui/material/Grid';
//import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';

const SignInButton = styled(Button)(() => ({
  color: deepOrange[400],
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
  borderRadius: '20px',
}));

function Home () {
  return (
    <div>
      <div className="App-header" style={{ maxHeight: '150px', padding:'10px' }}>
        <Grid
          justify="space-between"
          container
          spacing={10}
          pl={5}
          pr={5}
        >
          <Grid item xs>
            <img src={logo} className="App-logo"/>
          </Grid>
          <Grid item xs={6}>
            bb
          </Grid>
          <Grid item xs>
            <SignInButton variant="outlined" size="medium" style={{ fontSize:'12px', fontWeight:'bold', float: 'right' }}>Sign In</SignInButton>
          </Grid>
        </Grid>
      </div>
      <div className="Main-container">
        <div style={{ backgroundColor:'red', height:'300px', width:'50%', margin:'15px', marginTop:'100px' }}></div>
        <div style={{ backgroundColor:'blue', height:'200px', width:'50%', margin:'15px' }}>
          <h3 style={{ margin:'15px' }}>Category</h3>
        </div>
        <div style={{ backgroundColor:'green', height:'200px', width:'50%', margin:'15px' }}>
        </div>
      </div>
    </div>
  )
}

export default Home;