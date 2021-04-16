import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../utils/history';
import Landing from '../components/landing/Landing';
import Dashboard from '../components/dashboard/Dashboard';
import Chat from '../components/chat/Chat';
import ViewParty from '../components/ViewParty';
import PageNotFound from '../components/404';
import SearchParty from '../components/search/SearchParty';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import ImageUpload from '../components/ImageUpload';

const AppRouter = (): JSX.Element => (
	<Router history={history}>
		<Switch>
			<Route exact path='/'>
				<PublicRoute>
					<Landing />
				</PublicRoute>
			</Route>
			<Route exact path='/dashboard'>
				<PrivateRoute>
					<Dashboard />
				</PrivateRoute>
			</Route>
			<Route exact path='/chat/:id'>
				<PrivateRoute>
					<Chat />
				</PrivateRoute>
			</Route>
			<Route exact path='/party/:id'>
				<PrivateRoute>
					<ViewParty />
				</PrivateRoute>
			</Route>
			<Route exact path='/search'>
				<PrivateRoute>
					<SearchParty />
				</PrivateRoute>
			</Route>
			<Route exact path='/pictures/:id'>
				<PrivateRoute>
					<ImageUpload/>
				</PrivateRoute>
			</Route>
			<Route path='*'>
				<PageNotFound />
			</Route>
		</Switch>
	</Router>
);

export default AppRouter;
