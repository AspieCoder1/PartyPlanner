import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CSS from 'csstype';
import styles from './CreateAParty.module.scss';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import '../styles/slider.css';

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
  onSubmit: (party: CreatePartyFormValues) => void;
};

interface CreatePartyFormValues {
  name: string;
	organiser: string;
	description: string;
	location: string;
	date: Date;
	time: string;
	ageRate: boolean;
	attendeesID: string[];
	todoID: string;
	publicParty: boolean;
}

export const CreatePartyForm = (props: IProps): JSX.Element => {
	const initialValues: CreatePartyFormValues = {
    name: '',
    organiser: '',
		description: '',
		time: '00:01',
		date: new Date(),
		publicParty: false,
    ageRate: false,
    todoID: '',
		location: '',
		attendeesID: [],
	};

	const CreatePartySchema = Yup.object().shape({
		name: Yup.string().required('Required').min(7),
    description: Yup.string().required('Required').min(7),
    location: Yup.string().required('Required').min(5),
	});

	const formik = useFormik({
    initialValues: initialValues,
		onSubmit: async (
			values: CreatePartyFormValues,
			{ setSubmitting, setStatus }
		) => {
			setSubmitting(true);
			const errors = await props.onSubmit(values);
			setStatus(errors);
			setSubmitting(false);
		},
		validationSchema: CreatePartySchema,
  });
  
  return (
		<div>
			<div className={styles.header}>
				<h1>Create Party</h1>
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
        <textarea
          className={styles.textarea}
					name='description'
					placeholder='Party Description'
					onChange={formik.handleChange}
					value={formik.values.description}
        />
        <textarea
          className={styles.textarea}
					name='location'
					placeholder='Party location'
					onChange={formik.handleChange}
					value={formik.values.location}
        />
        
        <br/>
        <div>
				<label>Date: &nbsp;</label>
          <DatePicker
            format='dd-MM-yyyy'
            clearIcon={null}
            value={formik.values.date}
            onChange={formik.handleChange}
            minDate={new Date()}
          />
        </div>  

        <br/>
        <div>
          <label>Time: &nbsp;</label>
          <TimePicker
            clockIcon={null}
            disableClock={true}
            value={'00:01'}
            clearIcon={null}
            onChange={formik.handleChange}
          />
        </div>

        <div className='form-group'>
          <label>All Ages/Over 18:&nbsp;</label>
          <label className='switch'>
            <input type='checkbox' onChange={formik.handleChange} />
            <span className='slider round'></span>
          </label>
        </div>
        
        <br />
        <div className='form-group'>
          <label>Private/Public:&nbsp;</label>
          <label className='switch'>
            <input type='checkbox' onChange={formik.handleChange} />
            <span className='slider round'></span>
          </label>
        </div>


				<button
					data-testid='submitButton'
					id='submit'
					style={submitButton}
					type='submit'
					disabled={formik.isSubmitting}
				>
					Add
				</button>
			</form>
		</div>
	);
};