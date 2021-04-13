import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../utils/history';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import Chat from '../components/Chat';
import EditParty from '../components/EditParty';
import ViewParty from '../components/ViewParty';
import PageNotFound from '../components/404';
import { SearchParty } from '../components/SearchParty';

const AppRouter = (): JSX.Element => (
	<Router history={history}>
		<Switch>
			<Route exact path='/dashboard'>
				<Dashboard />
			</Route>
			<Route exact path='/'>
				<Landing />
			</Route>
			<Route exact path='/edit'>
				<EditParty />
			</Route>
			<Route exact path='/chat/:id'>
				<Chat />
			</Route>
			<Route exact path='/party/:id'>
				<ViewParty />
			</Route>
			<Route exact path='/search'>
				<SearchParty />
			</Route>
			<Route path='*'>
				<PageNotFound />
			</Route>
		</Switch>
	</Router>
);

export default AppRouter;
