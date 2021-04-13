import React, { useEffect } from 'react';
import styles from './MyParties.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import { getParties } from '../redux/party-slice';
import Party from './Party';

const MyParties = (): JSX.Element => {
	const id = useSelector((state: Store) => state.user.userName);
	const error = useSelector((state: Store) => state.parties.error);
	const parties = useSelector((state: Store) => state.parties.parties);
	const loading = useSelector((state: Store) => state.parties.loading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getParties(id));
	}, []);

	return (
		<div className={styles.grid}>
			{error ? <p className={styles.error}>{error}</p> : null}
			{loading ? <p className={styles.loading}>Loading...</p> : null}
			{parties.length > 0
				? parties.map((party) => <Party key={party._id} party={party} />)
				: null}
		</div>
	);
};
export default MyParties;
