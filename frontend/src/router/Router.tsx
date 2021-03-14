import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../utils/history';
import Landing from '../components/Landing';

const AppRouter = (): JSX.Element => (
	<Router history={history}>
		<Switch>
			<Route component={Landing} path='/' exact={true} />
		</Switch>
	</Router>
);

export default AppRouter;
