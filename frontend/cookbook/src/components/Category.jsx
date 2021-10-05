import React from 'react';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CategoryContainer from './CategoryContainer';

const useStyles = makeStyles(({
  root: {
    width: '100%',
    alignItems: 'center',
  },
  textHolder: {
    width: '583px',
    height: '41px',
    left: '0px',
    top: '507px',
    textAlign: 'right',
    background: '#C4C4C4',
  },
  text: {
    paddingTop: '6px',
    paddingRight: '100px',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',

    color: "#FFFFFF",
  },
  arrowLeft: {
    position: "absolute",
    left: '350px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',

  },
  arrowRight: {
    position: "absolute",
    right: '350px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  }
}));

function Category() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.textHolder}>
        <div className={classes.text}>Category</div>
      </div>
      <div className={classes.container}>
        <ArrowBackIosIcon className={classes.arrowLeft} />
        <ArrowForwardIosIcon className={classes.arrowRight} />
        <CategoryContainer />
      </div>
    </div>
  )
}

export default Category;