import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { toFirstCharUppercase } from './utils/constants';
import axios from 'axios';

// Styles
import { PokedexStyles } from './styles/PokedexStyles';

const Pokedex = () => {
  const history = useHistory();
  const useStyles = makeStyles(PokedexStyles);
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState(``);
  const [isPokemonShowing, setIsPokemonShowing] = useState(false);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const togglePokemon = () => {
    setIsPokemonShowing(!isPokemonShowing);
  };

  const getPokemonData = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then((response) => {
        const { data: { results } = {} } = response;
        const newPokemonData = {};

        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: '130px', height: '130px' }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.SearchIcon} />
            <TextField
              onChange={handleSearchChange}
              className={classes.searchInput}
              label="Pokemon"
              variant="standard"
            />
          </div>

          <Button
            id="genOne"
            onClick={togglePokemon}
            className={classes.genButton}
            variant="contained"
          >
            Gen One
          </Button>
          <Button className={classes.genButton} variant="contained">
            Gen Two
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className={classes.pokedexContainer}>
        {isPokemonShowing && Object.keys(pokemonData).map(
          (pokemonId) =>
            pokemonData[pokemonId].name.includes(filter) &&
            getPokemonCard(pokemonId)
        )}
      </Grid>
    </>
  );
};

export default Pokedex;
