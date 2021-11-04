import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Avatar, Divider, Rating } from '@mui/material';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',

    marginBottom: '30px',
    
    backgroundColor: '#FFFFFF',

    display: 'flex',
    gap: '15px',
  },
  block: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    padding: '20px',

    gap: '5px',
  },
  text: {
    width: '55vh',
    wordWrap: 'break-word'
  }
})

function RecipeReviewCard({ comment }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.block} style={{ marginLeft: '70px' }}>
        <Avatar sx={{ width: 60, height: 60 }} />
      </div>
      <div className={classes.block} style={{ width:'10vh', wordWrap:'break-word '}}>
        {comment.username}
      </div>
      <Divider orientation="vertical" variant="middle" flexItem/>
      <div className={classes.block}>
        <div style={{ marginLeft: '2px' }}>Posted: {comment.time}</div>
        <Rating name="read-only" value={comment.rating} readOnly size="small"/>
        <div className={classes.text} style={{ marginLeft: '2px' }}>{comment.comment}</div>
      </div>
    </div>
  )
}

RecipeReviewCard.propTypes = {
  comment: PropTypes.object,
}

export default RecipeReviewCard;