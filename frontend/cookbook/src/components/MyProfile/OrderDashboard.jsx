import React from "react";
import { makeStyles } from '@mui/styles';
import OrderCard from "./OrderCard";
import { Pagination } from "@mui/material";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '850px',
    width: '90%',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    top: '185px',
    right: '1100px',
    position: "absolute",

    height: '35px',
    width: '170px',

    textAlign: 'center',

    backgroundColor: '#F9FAF9',

    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: 'bold',

    color: '#89623D',
  },
  container: {
    width: '100%',

    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    margin: '30px',
  }
})

function OrderDashboard() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.title}>
        Orders
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
        {/* <Pagination count={10} page={page} onChange={handleChange} /> */}
        <Pagination count={10} />
      </div>
    </>
  )
}

export default OrderDashboard;