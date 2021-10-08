import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    margin: '20px 30px 20px 30px',

    borderRadius: '5px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '5px',

    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      border: '1px solid orange'
    },
    thumbnail: {
      maxWidth: '200px',
      maxHeight: '200px',

      margin: '5px',
    }
  },
})

function RecommendationCard({ data }) {
  const classes = useStyles();
  const history = useHistory();

  const handleRecipe = () => {
    history.push('/');
  }

  return (
    <div className={classes.root} onClick={handleRecipe}>
      <img src={data.picture} alt='thumbnail' className={classes.thumbnail} />
    </div>
  )
}

RecommendationCard.propTypes = {
  data: PropTypes.object
}

export default RecommendationCard;