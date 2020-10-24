import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
<<<<<<< HEAD:src/Pokedex.js
	AppBar,
	Toolbar,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CircularProgress,
	Typography,
	TextField,
=======
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
>>>>>>> 32f5bacbed270e92ab97e1bcdfa4f795d167b56f:src/Pokedex.jsx
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { toFirstCharUppercase } from './utils/constants';
import axios from 'axios';

<<<<<<< HEAD:src/Pokedex.js
const useStyles = makeStyles((theme) => ({
	pokedexContainer: {
		paddingTop: '20px',
		paddingLeft: '50px',
		paddingRight: '50px',
	},
	cardMedia: {
		margin: 'auto',
	},
	cardContent: {
		textAlign: 'center',
	},
	searchContainer: {
		display: 'flex',
		backgroundColor: fade(theme.palette.common.white, 0.15),
		paddingLeft: '20px',
		paddingRight: '20px',
		marginTop: '5px',
		marginBottom: '5px',
	},
	searchIcon: {
		alignSelf: 'flex-end',
		marginBottom: '5px',
	},
	searchInput: {
		width: '200px',
		margin: '5px',
	},
	genButton: {
		marginLeft: '10px',
		marginRight: '10px',
		paddingTop: '10px',
		paddingBottom: '10px',
	},
}));

const Pokedex = (props) => {
	const { history } = props;
	const classes = useStyles();
	const [pokemonData, setPokemonData] = useState({});
	const [filter, setFilter] = useState(``);
=======
// Styles
import { PokedexStyles } from './styles/PokedexStyles';

const Pokedex = () => {
  const history = useHistory();
  const useStyles = makeStyles(PokedexStyles);
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState(``);
>>>>>>> 32f5bacbed270e92ab97e1bcdfa4f795d167b56f:src/Pokedex.jsx

	const handleSearchChange = (e) => {
		setFilter(e.target.value);
	};

<<<<<<< HEAD:src/Pokedex.js
	const handleClick = (e) => {
		// let id = e.currentTarget.id;
		e.preventDefault();
		console.log(pokemonData);
	};

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
			.then(function (response) {
				const { data } = response;
				const { results } = data;
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
	}, []);
=======
  // TODO: Attach functionality to this handleClick
  const handleClick = (e) => {
    // let id = e.currentTarget.id;
    e.preventDefault();
    console.log(pokemonData);
  };

  useEffect(() => {
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
  }, []);
>>>>>>> 32f5bacbed270e92ab97e1bcdfa4f795d167b56f:src/Pokedex.jsx

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
						<Typography>{`${id}. ${toFirstCharUppercase(
							name
						)}`}</Typography>
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
						onClick={handleClick}
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