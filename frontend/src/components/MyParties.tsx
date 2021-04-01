import React, { useEffect } from 'react';
import styles from './MyParties.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import { getParties } from '../redux/party-slice';

const MyParties = (): JSX.Element => {
	const id = useSelector((state: Store) => state.user.id);
	const error = useSelector((state: Store) => state.parties.error);
	const parties = useSelector((state: Store) => state.parties.parties);
	const loading = useSelector((state: Store) => state.parties.loading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getParties(id));
	}, []);

	return (
		<>
			{error ? <p className={styles.error}>{error}</p> : null}
			{loading ? <p>Loading...</p> : null}
			{parties.length > 0 ? <p>Party goes here</p> : null}
		</>
	);
};
export default MyParties;
