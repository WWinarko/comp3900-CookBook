import React from "react";
import { makeStyles } from '@mui/styles';
import { Divider, FormControl, MenuItem, Select } from "@mui/material";
import RoundButton from "../RoundButton";

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
    marginLeft: '75px',
    marginRight: '75px',
  }
})

function OrderCard() {
  const classes = useStyles();
  const [orderStatus, setOrderStatus] = React.useState('');

  const handleChange = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <div style={{ color:'#FE793D', fontWeight:'bold' }}>Order ID</div>
        <div style={{ color:'#89623D', paddingLeft: '15px' }}>MC30091220</div>
        <div style={{ height:'50px' }}></div>
        <div style={{ color:'#FE793D', fontWeight:'bold' }}>Order Status</div>
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            id="orderStatus"
            value={orderStatus}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Not started</em>
            </MenuItem>
            <MenuItem value='Started'>Started</MenuItem>
            <MenuItem value='Dispatched'>Dispatched</MenuItem>
            <MenuItem value='Delivered'>Delivered</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Divider orientation="vertical" variant="middle" flexItem/>
      <div className={classes.block}>
        <div style={{ color:'#89623D', fontWeight:'bold' }}>User Name</div>
        <div>test</div>
        <div style={{ height:'20px' }}></div>
        <div style={{ color:'#89623D', fontWeight:'bold' }}>Ordered</div>
        <div>12 Sept 2012 12:20pm</div>
        <div style={{ height:'20px' }}></div>
        <div style={{ color:'#89623D', fontWeight:'bold' }}>Delivery address</div>
        <div>abcabcabc</div>
      </div>
      <div className={classes.block}>
        <RoundButton name="View Order"/>        
      </div>
    </div>
  )
}

export default OrderCard;