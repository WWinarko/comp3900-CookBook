import React, {useEffect, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
import axios from 'axios';

import SearchBar from './SearchBar';
import RoundButton from './RoundButton';
import AccountMenu from './AccountMenu';
import {ReactComponent as ReactLogo} from '../assets/CookBook.svg';
import {ReactComponent as CartIcon} from '../assets/shopping-cart.svg';
import {ReactComponent as AddRecipeIcon} from '../assets/add-recipe.svg';
import LoadingDialog from './LoadingDialog';

const useStyles = makeStyles(({
  root: {
    // height: '109px',
    height: '10vh',
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoading, setOpenLoading] = useState(false);
  const open = Boolean(anchorEl);
  const [photo, setPhoto] = useState('');

  const token = localStorage.getItem('cookbook-token');
  const user_id = localStorage.getItem('cookbook-profile');

  useEffect(() => {
    if (token !== null && user_id !== null) {
      axios.get('http://127.0.0.1:5000/profile/view', 
        { headers: {
          Authorization: `Bearer ${token}`
        },
          params: {
          user_id,
        }})
        .then((res) => {
          setPhoto(res.data['photo']);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [token, user_id]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }


  const handleSearch = (search, label=false) => {
    const keyword = search.trim();
    if (keyword !== '') {
      history.push(`/search?searchTerm=${keyword}&label=${label}`);
    }
  }
  return (
    <div className={classes.root} >
      <LoadingDialog open={openLoading} />
      <NavLink to="/">
        <ReactLogo className={classes.logo} />
      </NavLink>
      <SearchBar width="667px" placeholder="Search recipes" searchFunc={handleSearch}/>
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
          <Tooltip title="Recommendation" placement="bottom-end">
            <NavLink to='/recommendation'>
              <RecommendRoundedIcon sx={{ fontSize: 47, alignSelf: 'center', color: '#ffffff'}} className={classes.icon} />
            </NavLink>
          </Tooltip>
          <Tooltip title="Add New Recipe" placement="bottom-end">
            <NavLink to={(token !== null)? "/recipe/add" : "/login"}>
              <AddRecipeIcon className={classes.icon}/>
            </NavLink>
          </Tooltip>
          <Tooltip title="Show Cart" placement="bottom-end">
            <NavLink to={(token !== null)? "/cart" : "/login"}>
              <CartIcon className={classes.icon} />
            </NavLink>
          </Tooltip>
        </Stack>
        {token === null ?
          <NavLink to="/login">
            <RoundButton name="Login" />
          </NavLink>
        : 
        <>
          {photo !== '' ? <Avatar sx={{cursor: 'pointer'}} src={photo} onClick={handleMenu} />
          :
            <Avatar sx={{cursor: 'pointer'}} onClick={handleMenu}>C</Avatar>
          }
          <AccountMenu 
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            setOpenLoading={setOpenLoading}
          />
        </>
        }
      </Stack>
    </div>
  );
}

export default Navbar;