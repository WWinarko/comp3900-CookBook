import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import RecipeReviewCard from './RecipeReviewCard';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '50px',

    marginBottom: '30px',
    
    backgroundColor: 'red',
  }
})

function RecipeReviewContainer({ comments }) {
  const classes= useStyles();
  return (
    <div className={classes.root}>
      {comments.map((index) => {
        return (
          <div key={index}>
            <RecipeReviewCard />
          </div>
        )
      })}
    </div>
  )
}

RecipeReviewContainer.propTypes = {
  comments: PropTypes.array,
}

export default RecipeReviewContainer;