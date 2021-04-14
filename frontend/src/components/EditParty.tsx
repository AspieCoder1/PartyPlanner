import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CSS from 'csstype';
import styles from './dashboard/CreateParty.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import Toggle from 'react-toggle';
import { PartyUpdates, updateParty } from '../redux/party-slice';
import { useParams } from 'react-router';

const buttonStyles: CSS.Properties = {
	color: '#ddd9da',
	border: 'none',
	background: 'none',
	fontSize: '24px',
};

const submitButton: CSS.Properties = {
	background: '#6f3473',
	border: 'none',
	color: 'white',
	fontSize: '24px',
	marginTop: '16px',
	padding: '8px',
};

type IProps = {
	closeModal: () => void;
};

interface UpdatePartyFormValues {
	name: string;
	description: string;
	location: string;
	date: string;
	time: string;
	ageRate: boolean;
	publicParty: boolean;
}

const EditParty = (props: IProps): JSX.Element => {
	const dispatch = useDispatch();
	const errors = useSelector((state: Store) => state.parties.error);
	const party = useSelector((state: Store) => state.parties.party);
	const userName = useSelector((state: Store) => state.user.userName);
	const { id } = useParams<{ id: string }>();

	const initialValues: UpdatePartyFormValues = {
		name: '',
		description: '',
		time: '',
		date: new Date().toISOString().substring(0, 10),
		publicParty: false,
		ageRate: true,
		location: '',
	};

	if (party) {
		initialValues.name = party.name;
		initialValues.description = party.description;
		initialValues.time = party.time;
		initialValues.date = new Date(party.date).toISOString().substring(0, 10);
		initialValues.publicParty = party.publicParty;
		initialValues.ageRate = party.ageRate;
		initialValues.location = party.location;
	}

	const UpdatePartySchema = Yup.object().shape({
		name: Yup.string().required('Required').min(7),
		description: Yup.string().required('Required').min(7),
		location: Yup.string().required('Required').min(5),
	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: async (values: UpdatePartyFormValues, { setSubmitting }) => {
			console.log('submitting');

			const updates: PartyUpdates = {
				name: formik.values.name,
				description: formik.values.description,
				time: formik.values.time,
				date: formik.values.date,
				publicParty: formik.values.publicParty,
				ageRate: formik.values.ageRate,
				location: formik.values.location,
			};

			setSubmitting(true);
			dispatch(updateParty({ _id: id, updates }));
			setSubmitting(false);
		},
		validationSchema: UpdatePartySchema,
	});

	return (
		<div>
			<div className={styles.header}>
				<h1>Edit Party</h1>
				<button
					style={buttonStyles}
					className={styles.closeModal}
					onClick={props.closeModal}
				>
					&times;
				</button>
			</div>
			<form className={styles.form} onSubmit={formik.handleSubmit}>
				<input
					className={styles.input}
					type='text'
					name='name'
					placeholder='Party Name'
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				{formik.errors.name ? (
					<p className={styles.error}>{formik.errors.name}</p>
				) : null}
				<textarea
					className={styles.textarea}
					name='description'
					placeholder='Party Description'
					onChange={formik.handleChange}
					value={formik.values.description}
					minLength={7}
				/>
				<textarea
					className={styles.textarea}
					name='location'
					placeholder='Party location'
					onChange={formik.handleChange}
					value={formik.values.location}
				/>

				<label>Date: &nbsp;</label>
				<input
					className={styles.input}
					type='date'
					name='date'
					placeholder='Party Date'
					onChange={formik.handleChange}
					value={formik.values.date}
				/>
				<label>Time: &nbsp;</label>
				<input
					className={styles.input}
					type='time'
					value={formik.values.time}
					onChange={formik.handleChange}
					name='time'
				/>
				<div className='form-group'>
					<Toggle
						id='age-rate'
						checked={formik.values.ageRate}
						onChange={formik.handleChange}
						name='ageRate'
					/>
					<label htmlFor='age-rate'>Over 18</label>
				</div>

				<div>
					<Toggle
						id='public-party'
						checked={formik.values.publicParty}
						onChange={formik.handleChange}
						name='publicParty'
					/>
					<label htmlFor='public-party'>Public party</label>
				</div>

				<button
					data-testid='submitButton'
					id='submit'
					style={submitButton}
					type='submit'
					disabled={formik.isSubmitting}
				>
					Update party
				</button>
			</form>
		</div>
	);
};

export default EditParty;
