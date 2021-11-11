import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import RoundButton from "../RoundButton";
import { Skeleton, Stack } from "@mui/material";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    width: '80%',

    borderRadius: '10px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

    margin: '20px',
    padding: '30px 30px 30px 30px',

    display: 'flex',
  },
  block: {
    height: '150px',
    marginLeft: '2vw',
    marginRight: '2vw',

    wordWrap: 'break-word',
  }
})

function RecipeCard({ id }) {
  const classes = useStyles();
  const [loadingState, setLoadingState] = useState(true);
  const [recipe, setRecipe] = useState({});

  React.useEffect(() => {
    setLoadingState(true);
  }, [id])

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/view?recipe_id=' + id, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setRecipe(res);
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoadingState(false);
    })
  }, [id])

  return (
    <div className={classes.root}>
      {loadingState
        ? <>
            <div className={classes.block} style={{ marginRight:'15px' }}>
            <Skeleton width="150px" height="150px" />
            </div>
            <div className={classes.block} style={{ width:'35vh'}} >
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product ID</div>
              <Skeleton width="100%" />
              <div style={{ height:'50px' }}></div>
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product Name</div>
              <Skeleton width="100%" />
            </div>
            <div className={classes.block} style={{ width:'30vh'}} >
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Owner</div>
              <Skeleton width="100%" />
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Description</div>
              <Skeleton width="100%" />
              <div style={{ height:'20px' }}></div>
            </div>
            <div className={classes.block}>
              <Stack
                spacing={1}
              >
                <RoundButton name="Edit"/>
                <RoundButton name="Delete"/>
              </Stack>
            </div>
          </>
        : <>
            <div className={classes.block}>
              <img src={recipe.photo} alt='thumbnail' style={{ minWidth:'7vw', minHeight:'7vw', width:'7vw',  jeight:'7vw', border:'1px solid', borderRadius:'7px' }} />
            </div>
            <div className={classes.block} style={{ width:'14vw'}} >
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product ID</div>
              <div style={{ color:'#89623D', paddingLeft: '15px' }}>{id}</div>
              <div style={{ height:'50px' }}></div>
              <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product Name</div>
              <div style={{ color:'#89623D', paddingLeft: '15px' }}>{recipe.title}</div>
            </div>
            <div className={classes.block} style={{ width:'22vw'}} >
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Owner</div>
              <div>{recipe.owner_username}</div>
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Sold</div>
              <div>{recipe.sold}</div>
              <div style={{ height:'20px' }}></div>
              <div style={{ color:'#89623D', fontWeight:'bold' }}>Rating</div>
              <div>{recipe.rating} / 5</div>
            </div>
            <div className={classes.block} style={{ width:'4vw' }}>
              <Stack
                spacing={1}
              >
                <RoundButton name="Edit"/>
                <RoundButton name="Delete"/>
              </Stack>
            </div>
          </>
      }
    </div>
  )
}

RecipeCard.propTypes = {
  id: PropTypes.number,
}

export default RecipeCard;