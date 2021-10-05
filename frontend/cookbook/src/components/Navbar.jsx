import React from 'react';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import SearchBar from './SearchBar';
import RoundButton from './RoundButton';
import {ReactComponent as ReactLogo} from '../assets/Cookbook.svg';
import {ReactComponent as CartIcon} from '../assets/shopping-cart.svg';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(({
  root: {
    height: '109px',
    position: 'fixed',
    backgroundColor: '#FE793D',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    paddingLeft: '65px',
  },
  iconBar: {
    paddingRight: '65px',
  },
}));


function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
    // console.log("hi");
  }

  return (
    <div className={classes.root} >
      <ReactLogo className={classes.logo} />
      <SearchBar />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{border: "1.5px solid #FFFFFF", borderRadius: '5px'}}/>}
        spacing={5}
        className={classes.iconBar}
      >
        <CartIcon />
        <RoundButton name="Login" onClick={handleLogin} />
      </Stack>
    </div>
  );
}

export default Navbar;