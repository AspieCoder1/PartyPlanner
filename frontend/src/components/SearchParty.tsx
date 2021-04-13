import styles from './SearchParty.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import React, { useEffect, useState } from 'react';
import { publicParties } from '../redux/party-slice';
import Header from './Header';

export const SearchParty = (): JSX.Element => {
	const parties = useSelector((state: Store) => state.parties.parties);
	const dispatch = useDispatch();
	const [searchInput, setSearchInput] = useState<string>('');

	useEffect(() => {
		dispatch(publicParties(searchInput));
	}, []);

	return (
		<div>
			<Header/>
			<div className={styles.main}>
				<input
					type='text'
					id='header-search'
					placeholder='Search parties'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSearchInput(e.target.value)
					}
				/>

				<div className={styles.flexContainer}>{/*Test content goes here*/}</div>
			</div>
		</div>
	);
};
