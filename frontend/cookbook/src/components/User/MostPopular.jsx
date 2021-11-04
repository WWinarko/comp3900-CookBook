import React from 'react';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Divider } from '@mui/material';

const useStyles = makeStyles({
  root: {
    width: '70%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  arrows: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  container: {
    width: '90%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcontainer: {
    width: '40%',
    height: '400px',
    margin: '10px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  picture: {
    height: '300px',
    width: '300px',
    border: '1px solid black',
  },
  header: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '30px',
  
    color: '#FE793D',
  },
  text: {
    marginBottom: '50px',

    color:'#89623D', 
    fontSize:'18',
  }
})

function MostPopular() {
  const classes = useStyles();
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <p className={classes.header}>Most Popular</p>
      <div className={classes.root}>
        <ArrowBackIosIcon className={classes.arrows} />
        <div className={classes.container}>
          <div className={classes.subcontainer}>
            <img src='a' alt='thumbnail' className={classes.picture} />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor:'#FE793D', }}/>
          <div className={classes.subcontainer}>
            <p className={classes.header}>Name</p>
            <div className={classes.text}>
              <p>Sold: 123123123</p>
              <p>Difficulty: 2.0 / 5.0</p>
              <p>Sold: 123123123</p>
            </div>
          </div>
        </div>
        <ArrowForwardIosIcon className={classes.arrows} />
      </div>
    </div>
  )
}

export default MostPopular;