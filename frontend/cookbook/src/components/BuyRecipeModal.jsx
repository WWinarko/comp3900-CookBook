import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import BuyRecipeModalCard from './BuyRecipeModalCard';


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',

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
      <Drawer anchor="right" open={state} onClose={handleClose}>
        <div className={classes.root}>
          <BuyRecipeModalCard />
        </div>
      </Drawer>
)
}

BuyRecipeModal.propTypes = {
  state: PropTypes.bool,
  setState: PropTypes.func
}

export default BuyRecipeModal;