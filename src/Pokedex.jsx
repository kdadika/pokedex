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
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import { toFirstCharUppercase } from './utils/constants';
import { generations } from './generations';
import UseLocalStorage from '../src/hooks/useLocalStorage';
import axios from 'axios';

// Styles
import { PokedexStyles } from './styles/PokedexStyles';

const Pokedex = () => {
  const history = useHistory();
  const useStyles = makeStyles(PokedexStyles);
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState(``);
  const [limit, setLimit] = useState(151);
  const [offset, setOffset] = useState(0);
  const [favorite, setFavorite] = UseLocalStorage(false);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const generationButtonHelper = () => {
    const genBtns = generations.map((generation) => (
      <button
        id={generation.gen}
        onClick={handleClick}
        key={generation.gen}
        className={classes.genButton}
      >
        {generation.name}
      </button>
    ));

    return genBtns;
  };

  const handleClick = (e) => {
    const generation = e.target.id;
    if (generation) {
      const clickedGen = generations.find(
        (foundGen) => foundGen.gen === generation
      );

      setLimit(clickedGen.limit);
      setOffset(clickedGen.offset);
    }
  };

  const handleToggle = (e) => {
    setFavorite(({ favoriteValue, ...prevState }) => ({
      ...prevState,
      favoriteValue: !favoriteValue,
    }));
  };

  const getPokemonData = (limit, offset) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => {
        const { data: { results } = {} } = response;
        const newPokemonData = {};
        const pokemonNumber = offset + 1;

        results.forEach((pokemon, index) => {
          newPokemonData[index + pokemonNumber] = {
            id: index + pokemonNumber,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + pokemonNumber
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  };

  useEffect(() => {
    getPokemonData(limit, offset);
  }, [limit, offset]);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <FavoriteIcon onClick={handleToggle} id="heart" color="secondary" />
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

          <>{generationButtonHelper()}</>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className={classes.pokedexContainer}>
        {Object.keys(pokemonData).map(
          (pokemonId) =>
            pokemonData[pokemonId].name.includes(filter) &&
            getPokemonCard(pokemonId)
        )}
      </Grid>
    </>
  );
};

export default Pokedex;
