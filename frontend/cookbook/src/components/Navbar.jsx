import React from 'react';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import SearchBar from './SearchBar';
import RoundButton from './RoundButton';
import {ReactComponent as ReactLogo} from '../assets/CookBook.svg';
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
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
  },
  logo: {
    paddingLeft: '65px',
    cursor: 'pointer',
  },
  iconBar: {
    paddingRight: '65px',
  },
  cartIcon: {
    cursor: 'pointer',
  }
}));


function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
    // console.log("hi");
  }

  const handleHome = () => {
    history.push('/');
  }

  const handleCart = () => {
    history.push('/cart');
  }

  return (
    <div className={classes.root} >
      <ReactLogo className={classes.logo} onClick={handleHome}/>
      <SearchBar />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{border: "1.5px solid #FFFFFF", borderRadius: '5px'}}/>}
        spacing={5}
        className={classes.iconBar}
      >
        <CartIcon onClick={handleCart} className={classes.cartIcon} />
        <RoundButton name="Login" onClick={handleLogin} />
      </Stack>
    </div>
  );
}

export default Navbar;