import React, { useState } from "react";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({
  root: {
    background: '#FFFFFF',
    borderRadius: '50px',
    width: '667px',
    padding: '1px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function SearchBar() {
  const [ search, setSearch ] = useState('');
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <InputBase placeholder="Search recipes" value={search} onChange={e => setSearch(e.target.value)} />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
    </div>
  );
}

export default SearchBar;