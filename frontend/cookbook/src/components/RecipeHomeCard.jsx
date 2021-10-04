import React from 'react';
import PropTypes from 'prop-types';
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
    maxWidth: '106px',
    maxHeight: '106px',

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

function RecipeHomeCard({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={data.picture} alt='thumbnail' className={classes.thumbnail} />
      <div className={classes.title}>{data.title}</div>
      <div className={classes.desc}>
        <div style={{ marginRight: '5px' }}>Prep {data.prep} min</div>
        <div style={{ marginLeft: '5px' }}>Cook {data.cook} min</div>
      </div>
      <div>{data.rating}</div>
      <div className={classes.author}>{data.author}</div>
    </div>
  )
}

RecipeHomeCard.propTypes = {
  data: PropTypes.object
}

export default RecipeHomeCard;