import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import axios from 'axios';
import { apiRoute } from '../utils/api';
import styles from './dashboard/CreateParty.module.scss';

type InitialValues = {
	userID: string;
};

type Params = {
	id: string;
};

type Props = {
	closeModal: () => void;
};

const Invite = ({ closeModal }: Props): JSX.Element => {
	const [error, setError] = useState();
	const { id } = useParams<Params>();
	const initialValues: InitialValues = {
		userID: '',
	};
	const formik = useFormik({
		initialValues,
		onSubmit: async () => {
			try {
				await axios.post(`${apiRoute}/api/parties/invite/${id}`);
			} catch (e) {
				setError(e.data);
			}
		},
	});

	return (
		<div>
			<div className={styles.header}>
				<h1>Invite a person</h1>
				<button className={styles.closeButton} onClick={closeModal}>
					&times;
				</button>
			</div>
			<form onSubmit={formik.handleSubmit}>
				<input
					value={formik.values.userID}
					onChange={formik.handleChange}
					placeholder='Username'
				/>
			</form>
		</div>
	);
};

export default Invite;
