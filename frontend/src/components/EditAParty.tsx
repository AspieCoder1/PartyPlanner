import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CSS from 'csstype';
import styles from './CreateParty.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import Toggle from 'react-toggle';
import { updateParty } from '../redux/party-slice';

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
	organiser: string;
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
  const userName = useSelector((state: Store) => state.user.userName);
  //const partyID = useSelector((state: Store) => state.parties.id);

	const initialValues: UpdatePartyFormValues = {
		name: '',
		organiser: userName,
		description: '',
		time: '00:01',
		date: (new Date()).toString(),
		publicParty: false,
		ageRate: false,
		location: '',
	};

	const UpdatePartySchema = Yup.object().shape({
		name: Yup.string().required('Required').min(7),
		description: Yup.string().required('Required').min(7),
		location: Yup.string().required('Required').min(5),
	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: async (values: UpdatePartyFormValues, { setSubmitting }) => {
			console.log('submitting');
			const partyToUpdate = {
				...values,
				organiser: userName,
			};
			setSubmitting(true);
			//dispatch(updateParty(partyID, values));
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
					<Toggle id='age-rate' checked={formik.values.ageRate} onChange={formik.handleChange} name='ageRate' />
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
