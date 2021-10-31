import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import RecipeReviewContainer from './RecipeReviewContainer';
import { Divider, Pagination } from '@mui/material';
import RoundButton from '../RoundButton';

import { CommentsData } from './TempDataComments';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  textHolder: {
    width: '50%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1',
  },
  text: {
    zIndex: '5',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
  
    color: "#FFFFFF",
  },
})

function RecipeReview() {
  const classes = useStyles();
  const [comments, setComments] = useState(CommentsData);

  return (
    <div className={classes.root}>
      <div className={classes.textRow}>
        <div className={classes.textHolder}>
          <div className={classes.text}>Reviews (120)</div>

          <div style={{width:'100%', height:'41px', marginTop: '-35px'}}>
            <div style={{ backgroundColor:'#C4C4C4', width: '80%', height:'100%' }}/>
          </div>

        </div>
        <div style={{ flex:'1' }}/>
      </div>
      
      <div style={{ width:'50%', margin: '30px' }}>
        <RecipeReviewContainer comments={comments} setComments={setComments} />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Pagination count={10} />
          <RoundButton name="Comment" />
        </div>
      </div>
      {/* <Pagination count={10} page={page} onChange={handlePage} /> */}
      

      <Divider 
        sx={{ backgroundColor:'9D9D9D', height: '1px', width: '50%' }}
      />
    </div>
  )
}

export default RecipeReview;