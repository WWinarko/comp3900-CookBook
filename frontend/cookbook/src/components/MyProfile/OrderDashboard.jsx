import React, { useState } from "react";
import { makeStyles, styled } from '@mui/styles';
import OrderCard from "./OrderCard";
import { Pagination, ToggleButton, ToggleButtonGroup, } from "@mui/material";

import { OrderData } from "./TempData";

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
    top: '290px',
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
    paddingRight: '700px',

    display: 'flex',
    gap: '5px',

    marginBottom: '30px',
  },
  total: {
    top: '270px',
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup) ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '15px',
    border: 0,
    backgroundColor: '#89623D',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#785635',
    },
    color: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: 'red',
  }
})

function OrderDashboard() {
  const classes = useStyles();
  const [lst, setLst] = useState(OrderData.filter((i) => i.status === ''));
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/recipe/listall', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          console.log(res)
        })
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      console.log('a')
    })
  }, [])

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

  const handleFilter = (event, name) => {
    setFilter(name);
    
    setPage(1);
  }

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/order/view?token=' + localStorage.getItem("cookbook-token") + '&status=' + filter, {
      method: 'GET',
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          console.log(res);
        })
      }
    })
  }, [filter])

  return (
    <>
      <div className={classes.filter}>
        <StyledToggleButtonGroup
          orientation="horizontal"
          exclusive
          sx={{ width:'100%' }}
          value={filter}
          onChange={handleFilter}
        >
          <ToggleButton value="Processing">
            Processing
          </ToggleButton>

          <ToggleButton value="Dispatched">
            Dispatched
          </ToggleButton>

          <ToggleButton value="Delivered">
            Delivered
          </ToggleButton>

        </StyledToggleButtonGroup>
        
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