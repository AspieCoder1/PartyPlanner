import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Store } from '../redux/store';

type Props = {
	children: ReactElement;
};

const PrivateRoute = ({ children }: Props): JSX.Element => {
	const isAuthenticated = useSelector((state: Store) => !!state.user.id);
	return isAuthenticated ? children : <Redirect to='/' />;
};

export default PrivateRoute;
