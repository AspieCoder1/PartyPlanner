import * as React from 'react';
import { useFormik } from 'formik';
import styles from './LoginForm.module.scss';
import * as Yup from 'yup';
import CSS from 'csstype';
import { UserErrors } from '../redux/user-slice';

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
	onSubmit: (user: LoginFormValues) => void;
	errors: UserErrors;
};

interface LoginFormValues {
	email: string;
	password: string;
}

export const LoginForm = (props: IProps): JSX.Element => {
	const initialValues: LoginFormValues = {
		email: '',
		password: '',
	};

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().required('Required'),
	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: async (values: LoginFormValues, { setSubmitting, setStatus }) => {
			setSubmitting(true);
			const errors = await props.onSubmit(values);
			setStatus(errors);
			setSubmitting(false);
		},
		validationSchema: LoginSchema,
	});

	return (
		<div>
			<div className={styles.header}>
				<h1>Log In</h1>
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
					name='email'
					placeholder='e-mail'
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				{formik.status && formik.status.email ? (
					<p id='emailError' className={styles.error}>
						{formik.status.email}
					</p>
				) : (
					formik.errors.email &&
					formik.touched.email && (
						<p id='emailError' className={styles.error}>
							{formik.errors.email}
						</p>
					)
				)}
				<input
					className={styles.input}
					type='password'
					name='password'
					placeholder='password'
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				{formik.status && formik.status.password ? (
					<p id='emailError' className={styles.error}>
						{formik.status.password}
					</p>
				) : (
					formik.errors.password &&
					formik.touched.password && (
						<p id='emailError' className={styles.error}>
							{formik.errors.password}
						</p>
					)
				)}
				<button
					data-testid='submitButton'
					id='submit'
					style={submitButton}
					type='submit'
					disabled={formik.isSubmitting}
				>
					Log In
				</button>
			</form>
		</div>
	);
};
