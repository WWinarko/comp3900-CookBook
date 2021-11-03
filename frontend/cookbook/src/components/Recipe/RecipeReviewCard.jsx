import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '50px',

    marginBottom: '30px',
    
    backgroundColor: 'red',
  }
})

function RecipeReviewCard({ comment }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {comment}
    </div>
  )
}

RecipeReviewCard.propTypes = {
  comment: PropTypes.string,
}

export default RecipeReviewCard;