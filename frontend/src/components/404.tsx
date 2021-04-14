import * as React from 'react';
import { ReactComponent as Image } from '../img/404.svg';
import styles from './PageNotFound.module.scss';
import Header from './shared/Header';

const PageNotFound = (): JSX.Element => {
	return (
		<>
			<Header />
			<div className={styles.noPageContainer}>
				<Image />
			</div>
		</>
	);
};

export default PageNotFound;
