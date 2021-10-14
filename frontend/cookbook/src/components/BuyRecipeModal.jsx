import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { Typography, Stack } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import BuyRecipeModalCard from './BuyRecipeModalCard';


const useStyles = makeStyles({
  root: {
    width: '520%',
    height: '100%',
    padding: '5px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#C4C4C4',
  },
})

function BuyRecipeModal({ state, setState }) {
  const classes = useStyles();

  const handleClose = () => {
    setState(false);
  }

  return (
      <Drawer anchor="right" open={state} onClose={handleClose} sx={{width: '520px'}}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{padding: '20px', backgroundColor: '#FE793D', color: '#ffffff'}}
        >
          <Typography component="h1" variant="h5" sx={{fontWeight: 600}}>Add products to cart</Typography>
          <CancelOutlinedIcon fontSize="large"/>
        </Stack>
        <Stack className={classes.root}>
          <BuyRecipeModalCard />
        </Stack>
      </Drawer>
)
}

BuyRecipeModal.propTypes = {
  state: PropTypes.bool,
  setState: PropTypes.func
}

export default BuyRecipeModal;