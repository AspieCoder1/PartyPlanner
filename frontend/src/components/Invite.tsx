import React from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import styles from './dashboard/CreateParty.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { invite } from '../redux/party-slice';
import { Store } from '../redux/store';

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
	const dispatch = useDispatch();
	const error = useSelector((state: Store) => state.parties.inviteError);
	const { id } = useParams<Params>();
	const initialValues: InitialValues = {
		userID: '',
	};
	const formik = useFormik({
		initialValues,
		onSubmit: (values: InitialValues) => {
			console.log('Submitting');
			dispatch(
				invite({
					id,
					userID: values.userID,
				})
			);
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
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				<input
					name='userID'
					value={formik.values.userID}
					className={styles.input}
					onChange={formik.handleChange}
					placeholder='Username'
				/>
				<button type='submit' className={styles.buttonSubmit}>
					Invite
				</button>
				{error ? <p className={styles.error}>{error}</p> : null}
			</form>
		</div>
	);
};

export default Invite;
