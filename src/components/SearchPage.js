import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Container, Grid, Typography } from '@material-ui/core';

import { server } from '../API';



const useStyles = makeStyles((theme) => ({
  search: {
    margin: '10px auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchResult: {
    display: 'block',
    textAlign: 'center',
  },
  searchItem: {
    padding: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export const SearchPage = () => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');  
  const [result, setResult] = useState([]);

  const inputHandler = (event) => {
    setSearchValue(event.target.value)
  };
  const searchHandler = async (value) => {
    try {
        const { status, data } = await server(`advice/search/${value}`);
        if (status === 200) {
            setResult(data)
            console.log(data)
        }
    } catch (error) {
        console.log(error);
    }
    setSearchValue('')
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
        const { status, data } = await server(`advice/search/${searchValue}`);
        if (status === 200) {
            setResult(data)
            console.log(data)
        }
    } catch (error) {
        console.log(error);        
    }
    setSearchValue('')
  };

  return (
    <Container maxWidth='md'>
      <Paper component="form" className={classes.search} onSubmit={(event) => submitHandler(event)}>
        <InputBase
          className={classes.input}
          placeholder="Search advice"
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}
          onChange={(event) => inputHandler(event)}
        />
        <IconButton className={classes.iconButton} aria-label="search" onClick={() => searchHandler(searchValue)}>
          <SearchIcon />
        </IconButton>
      </Paper>
      {result.message &&
        <Typography variant='overline' className={classes.searchResult}>
          {result.message.text}
      </Typography>
      }
      {result.total_results &&
        <Typography variant='overline' className={classes.searchResult}>          
            Found {result.total_results} advice for your search:
      </Typography>
      }
      <Grid container spacing={2}>
        {result.slips && result.slips.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Paper className={classes.searchItem}>
              <Typography color='textSecondary'>
                Advice: <Typography color='textPrimary' variant='overline'>{item.advice}</Typography>
              </Typography >
              <Typography color='textSecondary'>
                Date: <Typography color='textPrimary' variant='overline'>{item.date}</Typography>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}