import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  Grid,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toFirstCharUppercase } from './utils/constants';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useLocalStorage from './hooks/useLocalStorage';

// Styles
import { PokedexStyles } from './styles/PokedexStyles';

const PokemonCard = ({id, name, sprite, pokemonId}) => {
  const history = useHistory();
  const useStyles = makeStyles(PokedexStyles);
  const classes = useStyles();
  const [favorite, setFavorite] = useLocalStorage('favorite', false);

  const handleToggle = () => {
    setFavorite(!favorite);
  };

  return (
    <Grid item xs={4} key={pokemonId}>
      <Card
        // onClick={() => history.push(`/${pokemonId}`)}
      >
        <FavoriteIcon
          onClick={handleToggle}
          id="heart"
          color={favorite ? 'secondary' : 'primary'}
        />
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
  )
}

export default PokemonCard;