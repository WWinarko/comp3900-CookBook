import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';

import BuyRecipeModalCard from './BuyRecipeModalCard';

const useStyles = makeStyles({
  root: {
    width: '600px',
    height: '100%',
    borderRadius: '5px',

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
    <div>
      <Drawer anchor="right" open={state} onClose={handleClose}>
        <div className={classes.root}>
          <BuyRecipeModalCard />
        </div>
      </Drawer>
    </div>
  )
}

BuyRecipeModal.propTypes = {
  state: PropTypes.bool,
  setState: PropTypes.func
}

export default BuyRecipeModal;