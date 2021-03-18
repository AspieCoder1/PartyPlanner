import React, {lazy, Suspense} from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../utils/history';
const Landing =  lazy(() => import('../components/Landing'));
const Dashboard =  lazy(() => import('../components/Dashboard'));

const AppRouter = (): JSX.Element => (
	<Router history={history}>
		<Suspense fallback={<div>Page is loading...</div>}>
			<Switch>
				<Route component={Landing} path='/' exact={true} />
				<Route component={Dashboard} path='/dashboard' exact={true} />
			</Switch>
		</Suspense>
	</Router>
);

export default AppRouter;
