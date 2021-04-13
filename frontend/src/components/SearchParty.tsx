import styles from './SearchParty.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import React, { useEffect, useState } from 'react';
import { Party, publicParties, setFilter } from '../redux/party-slice';
import Header from './Header';
import PublicParty from './PublicParty';

export const SearchParty = (): JSX.Element => {
	const dispatch = useDispatch();
	const [searchInput, setSearchInput] = useState<string>('');

	const parties = useSelector((state: Store) =>
		state.parties.parties.filter(({ name }: Party) =>
			name.toLowerCase().includes(state.parties.filter)
		)
	);
	const error = useSelector((state: Store) => state.parties.publicPartyError);

	useEffect(() => {
		dispatch(publicParties(searchInput));
	}, []);

	useEffect(() => {
		dispatch(setFilter(searchInput));
	}, [searchInput]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.searchBox}>
					<input
						className={styles.input}
						type='text'
						id='header-search'
						placeholder='Search parties'
						onChange={onChangeHandler}
					/>
				</div>
				<div className={styles.grid}>
					{error ? <p className={styles.error}>{error}</p> : null}
					{parties.length > 0
						? parties.map((party: Party) => (
								<PublicParty key={party._id} party={party} />))
						: null}
				</div>
			</div>
		</>
	);
};
