import React from "react";
import { makeStyles } from '@mui/styles';
import RoundButton from "../RoundButton";
import { Stack } from "@mui/material";

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
    marginLeft: '50px',
    marginRight: '50px',
  }
})

function RecipeCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.block} style={{ marginRight:'15px' }}>
        <img src='a' alt='thumbnail' style={{ minWidth:'150px', minHeight:'150px', border:'1px solid', borderRadius:'7px' }} />
      </div>
      <div className={classes.block}>
        <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product ID</div>
        <div style={{ color:'#89623D', paddingLeft: '15px' }}>MC30091220</div>
        <div style={{ height:'50px' }}></div>
        <div style={{ color:'#FE793D', fontWeight:'bold' }}>Product Name</div>
        <div style={{ color:'#89623D', paddingLeft: '15px' }}>test</div>
      </div>
      <div className={classes.block}>
        <div style={{ color:'#89623D', fontWeight:'bold' }}>Price</div>
        <div>$10.00</div>
        <div style={{ height:'20px' }}></div>
        <div style={{ color:'#89623D', fontWeight:'bold' }}>Description</div>
        <div>testadfasdfasdfasdfa dsf adsf asdf asedt rrewterteads tdasdf ads rasre</div>
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
    </div>
  )
}

export default RecipeCard;