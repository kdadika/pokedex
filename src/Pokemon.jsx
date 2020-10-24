import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import { toFirstCharUppercase } from './utils/constants';
import axios from 'axios';

const Pokemon = (props) => {
<<<<<<< HEAD:src/Pokemon.js
	const { match, history } = props;
	const { params } = match;
	const { pokemonId } = params;
	const [pokemon, setPokemon] = useState(undefined);

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
			.then(function (response) {
				const { data } = response;
				setPokemon(data);
			})
			.catch(function (error) {
				setPokemon(false);
			});
	}, [pokemonId]);

	const generatePokemon = (pokemon) => {
		const { name, id, species, height, weight, types, sprites } = pokemon;
		const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
		const { front_default } = sprites;
		const typeJSX = types.map((typeInfo) => {
			const { type } = typeInfo;
			const { name } = type;
			return <Typography key={name}> {`${name}`}</Typography>;
		});
		return (
			<>
				<Typography variant="h1">
					{`${id}.`} {toFirstCharUppercase(name)}
					<img src={front_default} />
				</Typography>
				<img
					style={{ width: '300px', height: '300px' }}
					src={fullImageUrl}
				/>
				<Typography variant="h3">Pokemon Info</Typography>
				<Typography>
					{'Species: '}
					<Link href={species.url}>{species.name} </Link>
				</Typography>
				<Typography>Height: {height} </Typography>
				<Typography>Weight: {weight} </Typography>
				<Typography variant="h6"> Types:</Typography>
				{typeJSX}
			</>
		);
	};
	return (
		<>
			{pokemon === undefined && <CircularProgress />}
			{pokemon !== undefined && pokemon && generatePokemon(pokemon)}
			{pokemon === false && <Typography> Pokemon not found</Typography>}
			{pokemon !== undefined && (
				<Button variant="contained" onClick={() => history.push('/')}>
					back to pokedex
				</Button>
			)}
		</>
	);
=======
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const history = useHistory();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
      })
      .catch((error) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemon = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    const pokemonTypes = types.map((typeInfo) => {
      const { type } = typeInfo;
      const { name } = type;
      return (
        <Typography key={toFirstCharUppercase(name)}>
          {' '}
          {`${toFirstCharUppercase(name)}`}
        </Typography>
      );
    });
    return (
      <>
        <Typography variant="h1">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} alt="pokemon img" />
        </Typography>
        <img
          style={{ width: '300px', height: '300px' }}
          src={fullImageUrl}
          alt="pokemon img"
        />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {'Species: '}
          <Link href={species.url}>{toFirstCharUppercase(species.name)}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Types:</Typography>
        {pokemonTypes}
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemon(pokemon)}
      {pokemon === false && <Typography>Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push('/')}>
          Back to Pokedex
        </Button>
      )}
    </>
  );
>>>>>>> 32f5bacbed270e92ab97e1bcdfa4f795d167b56f:src/Pokemon.jsx
};

export default Pokemon;
