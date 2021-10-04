/* eslint-disable react/prop-types */
import React from "react";
import { FormControl , FormLabel, OutlinedInput } from "@mui/material";
// import { styled } from '@mui/material/styles';

// const  = styled(Button)(() => ({
//   background: '#F9FAF9',
//   color: '#FE793D',
//   border: '1px solid #E97048',
//   borderRadius: '20px',
//   backgroundColor: '#FFFFFF',
//   '&:hover': {
//     backgroundColor: '#FFFFFF',
//   },
//   textTransform: 'none',
//   fontsize: '18px',
//   fontWeight: 'bold',
// }));

// font-family: Roboto;
// font-style: normal;
// font-weight: 500;
// font-size: 18px;
// line-height: 21px;
// /* identical to box height */

// color: #89623D;




function CustomTextField(props) {
  const {id, name, value, setValue, width} = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{marginTop: '15px'}}>
        <FormLabel component="legend" sx={{ color: '#89623D', fontSize: '18px', fontWeight: '500' }}>{name}</FormLabel>
        <OutlinedInput id={id} value={value} onChange={handleChange} sx={{borderRadius: '3px', width: width, margin: '10px 0', backgroundColor:'#ffffff', color: '#000000'}}/>
    </FormControl>
  )  
}

export default CustomTextField;