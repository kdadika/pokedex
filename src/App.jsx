import React from 'react';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import { Route, Switch } from 'react-router-dom';

const App = () => (
<<<<<<< HEAD:src/App.js
	<Switch>
		<Route exact path="/" render={(props) => <Pokedex {...props} />} />
		<Route
			exact
			path="/:pokemonId"
			render={(props) => <Pokemon {...props} />}
		/>
	</Switch>
=======
  <Switch>
    <Route exact path="/" render={() => <Pokedex />} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
  </Switch>
>>>>>>> 32f5bacbed270e92ab97e1bcdfa4f795d167b56f:src/App.jsx
);

export default App;
