import React from 'react';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <Switch>
    <Route exact path="/" render={() => <Pokedex />} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
  </Switch>
);

export default App;
