import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({
  root: {
    width: '183px',
    height: '207px',

    margin: '20px 30px 20px 30px',

    border: '1px solid black',
    borderRadius: '5px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '5px',

  },
  thumbnail: {
    width: '106px',
    height: '106px',

    border: '1px solid black',
    borderRadius: '5px',

    marginTop: '15px',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#89623D',
  },
  desc: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    color: '#89623D',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  author: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    color: '#000000',
  }
}));

function RecipeCardHome() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.thumbnail}>
        <img src='a' alt='thumbnail' />
      </div>
      <div className={classes.title}>Honey Chicken</div>
      <div className={classes.desc}>
        <div style={{ marginRight: '5px' }}>Prep 10 min</div>
        <div style={{ marginLeft: '5px' }}>Cook 10 min</div>
      </div>
      <div></div>
      <div className={classes.author}>Wincent</div>
    </div>
  )
}

export default RecipeCardHome;