import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Store } from '../redux/store';

type Props = {
  children: ReactElement;
};

const PublicRoute = ({ children }: Props): JSX.Element => {
	const isAuthenticated = useSelector((state: Store) => !!state.user.id);
	return isAuthenticated ? <Redirect to='/dashboard' /> : children;
};

export default PublicRoute;