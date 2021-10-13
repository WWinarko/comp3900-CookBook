import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import SearchBar from './SearchBar';
import RoundButton from './RoundButton';
import AccountMenu from './AccountMenu';
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }
  
  const token = localStorage.getItem('cookbook-token');
  const handleLogin = () => {
    history.push('/login');
  }

  const handleHome = () => {
    if (location['pathname'] !== '/') {
      history.push('/');
    }
  }

  const handleCart = () => {
    if (token !== null) {
      history.push('/cart');
    } else {
      history.push('/login');
    }
  }

  const handleAdd = () => {
    if (token !== null) {
      history.push('/recipe/add');
    } else {
      history.push('/login');
    }
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
        {token === null ? <RoundButton name="Login" onClick={handleLogin} /> 
        : 
        <>
          <Avatar sx={{cursor: 'pointer'}} onClick={handleMenu}>C</Avatar>
          <AccountMenu 
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          />
        </>
        }
      </Stack>
    </div>
  );
}

export default Navbar;