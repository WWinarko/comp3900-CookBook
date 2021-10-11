import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

import SearchBar from './SearchBar';
import RoundButton from './RoundButton';
import {ReactComponent as ReactLogo} from '../assets/CookBook.svg';
import {ReactComponent as CartIcon} from '../assets/shopping-cart.svg';
import {ReactComponent as AddRecipeIcon} from '../assets/add-recipe.svg';

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
    zIndex: '10',
  },
  logo: {
    paddingLeft: '65px',
    cursor: 'pointer',
  },
  iconBar: {
    paddingRight: '65px',
  },
  icon: {
    cursor: 'pointer',

  },
  
}));


function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  
  const handleLogin = () => {
    history.push('/login');
    // console.log("hi");
  }

  const handleHome = () => {
    if (location['pathname'] !== '/') {
      history.push('/');
    }
  }

  const handleCart = () => {
    history.push('/cart');
  }

  const handleAdd = () => {
    history.push('/recipe/add');
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
        <Stack
          direction="row"
          spacing={3}
          alignItems="center">
          <Tooltip title="Add New Recipe" placement="bottom-end">
            <AddRecipeIcon onClick={handleAdd} className={classes.icon}/>
          </Tooltip>
          <CartIcon onClick={handleCart} className={classes.icon} />
        </Stack>
        <RoundButton name="Login" onClick={handleLogin} />
      </Stack>
    </div>
  );
}

export default Navbar;