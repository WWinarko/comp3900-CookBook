import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import OrderCard from "./OrderCard";
import { Pagination } from "@mui/material";

import { OrderData } from "./TempData";
import SquareButton from "../SquareButton";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#F9FAF9',
    height: '850px',
    width: '90%',

    border: '3px solid #89623D',
    borderRadius: '10px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    top: '270px',
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
    height: '95%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    margin: '30px',

    overflow: 'hidden',
  },
  filter: {
    paddingRight: '550px',

    display: 'flex',
    gap: '5px',

    marginBottom: '40px',
  },
  total: {
    top: '250px',
    right: '200px',
    position: "absolute",

    height: '35px',
    width: '170px',

    textAlign: 'center',

    backgroundColor: '#F9FAF9',

    fontFamily: 'Roboto',
    fontSize: '20px',

    color: '#89623D',
  }
})

function OrderDashboard() {
  const classes = useStyles();
  const [lst, setLst] = useState(OrderData.filter((i) => i.status === ''));
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  const handlePage = (event, value) => {
    setPage(value);
  }

  const handleMove = (item, newStatus) => {
    const index = lst.indexOf(item);
    if (index !== -1) {
      lst[index].status = newStatus;
    }
    setLst(OrderData.filter((i) => i.status === filter));
  }

  const handleFilter = (name) => {
    setFilter(name);
    
    setPage(1);
  }

  React.useEffect(() => {
    setLst(OrderData.filter((i) => i.status === filter));
  }, [filter])

  return (
    <>
      <div className={classes.filter}>
        <SquareButton name="Not Started" onClick={() => handleFilter('')} />
        <SquareButton name="Started" onClick={() => handleFilter('Started')} />
        <SquareButton name="Dispatched" onClick={() => handleFilter('Dispatched')} />
        <SquareButton name="Delivered" onClick={() => handleFilter('Delivered')} />
      </div>
      <div className={classes.title}>
        Orders
      </div>
      <div className={classes.total}>
        Total: {lst.length}
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          {lst.slice((page - 1) * 3, (page * 3)).map((order, index) => {
            return (
              <OrderCard order={order} handleMove={handleMove} key={index} />
            )
          })}
        </div>
        <Pagination count={10} page={page} onChange={handlePage} />
      </div>
    </>
  )
}

export default OrderDashboard;