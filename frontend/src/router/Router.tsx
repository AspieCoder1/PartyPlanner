import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../utils/history';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';

const AppRouter = (): JSX.Element => (
	<Router history={history}>
		<Switch>
			<Route component={Landing} path='/' exact={true} />
			<Route component={Dashboard} path='/dashboard' exact={true} />
		</Switch>
	</Router>
);

export default AppRouter;
