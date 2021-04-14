import styles from './SearchParty.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../redux/store';
import React, { useEffect, useState } from 'react';
import { filterParties, Party, publicParties } from '../../redux/party-slice';
import Header from '../shared/Header';
import PublicParty from './PublicParty';
import headerStyles from '../shared/Header.module.scss';
import { Link } from 'react-router-dom';

const SearchParty = (): JSX.Element => {
	const dispatch = useDispatch();
	const [searchInput, setSearchInput] = useState<string>('');

	const parties = useSelector((state: Store) => state.parties.filtered);
	const error = useSelector((state: Store) => state.parties.publicPartyError);

	useEffect(() => {
		dispatch(publicParties(searchInput));
	}, []);

	useEffect(() => {
		dispatch(filterParties(searchInput));
	}, [searchInput]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
	};

	return (
		<>
			<Header>
				<Link className={headerStyles.headerLink} to='/dashboard'>
					Dashboard
				</Link>
			</Header>
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
								<PublicParty key={party._id} party={party} />
						  ))
						: null}
				</div>
			</div>
		</>
	);
};

export default SearchParty;
