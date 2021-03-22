import * as React from 'react';
import { useFormik } from 'formik';
import styles from './AddTaskForm.module.scss';
import * as Yup from 'yup';
import CSS from 'csstype';
import { now } from 'lodash';

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
	onSubmit: (user: AddTaskFormValues) => void;
};

interface AddTaskFormValues {
	taskname: string;
	taskdesc: string;
	taskdue: string;
}


export const AddTaskForm = (props: IProps): JSX.Element => {
	const initialValues: AddTaskFormValues = {
		taskname: '',
		taskdesc: '',
		taskdue: '',
	};

	const AddTaskSchema = Yup.object().shape({
		taskname: Yup.string().required('Required'),
		taskdesc: Yup.string().required('Required'),
	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: async (values: AddTaskFormValues, { setSubmitting, setStatus }) => {
			setSubmitting(true);
			const errors = await props.onSubmit(values);
			setStatus(errors);
			setSubmitting(false);
		},
		validationSchema: AddTaskSchema,

	});
	return (
		<div>
			<div className={styles.header}>
				<h1>Create Task</h1>
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
					name='taskname'
					placeholder='Task Name'
					onChange={formik.handleChange}
					value={formik.values.taskname}
				/>
				<input
					className={styles.input}
					type='text'
					name='taskdesc'
					placeholder='Task Description'
					onChange={formik.handleChange}
					value={formik.values.taskdesc}
				/>
				<input
					className={styles.input}
					type='datetime-local'
					name='taskdue'
					placeholder='Due Date & Time'
					onChange={formik.handleChange}
					value={formik.values.taskdue}
				/>
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
