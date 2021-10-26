import React, { useState } from "react";
import PropTypes from 'prop-types';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({
  root: {
    background: '#FFFFFF',
    borderRadius: '50px',
    width: '667px',
    padding: '1px 10px 1px 15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function SearchBar({ width, placeholder, border }) {
  const [ search, setSearch ] = useState('');
  const classes = useStyles();

  const handleSearch = () => {
    console.log(search);
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter') {
      console.log(search);
      console.log(width);
    }
  }
  return (
    <div className={classes.root} style={{ width: width, border: border }}>
        <InputBase placeholder={placeholder} value={search} onChange={e => setSearch(e.target.value)} sx={{width:'100%'}} onKeyPress={handleEnter}/>
        <IconButton type="submit" sx={{ padding: '7px' }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
        </IconButton>
    </div>
  );
}

SearchBar.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  border: PropTypes.string,
}

export default SearchBar;