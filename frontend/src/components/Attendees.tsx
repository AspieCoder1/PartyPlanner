import React from 'react';
import styles from './ViewParty.module.scss';
import { uniqueId } from 'lodash';

type Props = {
	attendees: string[];
};

const Attendees = ({ attendees }: Props): JSX.Element => {
	return (
		<div className={styles.locationOrganiser}>
			<h2>Attendees</h2>
			{attendees.length > 0 ? attendees.map((attendee: string) => <p key={uniqueId()}>{attendee}</p>) : null}
		</div>
	);
};

export default Attendees;
