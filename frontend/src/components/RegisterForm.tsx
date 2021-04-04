import * as React from 'react';
import { useFormik } from 'formik';
import styles from './LoginForm.module.scss';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import { registerUser } from '../redux/user-slice';
import { closeButton, submitButton } from './buttonStyles';

interface RegisterFormValues {
	email: string;
	username: string;
	password: string;
}

type IProps = {
	closeModal: () => void;
};

export const RegisterForm = (props: IProps): JSX.Element => {
	const dispatch = useDispatch();
	const errors = useSelector((state: Store) => state.user.errors);

	const initialValues: RegisterFormValues = {
		email: '',
		username: '',
		password: '',
	};

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		username: Yup.string()
			.trim()
			.min(5, 'username must have at least 5 characters')
			.max(20, 'max username length is 20 characters')
			.matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
			.required('Required'),
		password: Yup.string()
			.min(8, 'Password must have a length of at least 8')
			.required('Required'),
	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: async (values: RegisterFormValues, { setSubmitting }) => {
			setSubmitting(true);
			await dispatch(registerUser(values));
			setSubmitting(false);
		},
		validationSchema: LoginSchema,
	});

	return (
		<div>
			<div className={styles.header}>
				<h1>Register</h1>
				<button className={styles.closebutton} onClick={props.closeModal}>
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
				{errors.email ? (
					<p id='emailError' className={styles.error}>
						{errors.email}
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
					type='text'
					name='username'
					placeholder='username'
					onChange={formik.handleChange}
					value={formik.values.username}
				/>
				{errors.username ? (
					<p id='usernameError' className={styles.error}>
						{errors.username}
					</p>
				) : (
					formik.errors.username &&
					formik.touched.username && (
						<p id='usernameError' className={styles.error}>
							{formik.errors.username}
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
				{errors.password ? (
					<p id='passwordError' className={styles.error}>
						{errors.password}
					</p>
				) : (
					formik.errors.password &&
					formik.touched.password && (
						<p id='passwordError' className={styles.error}>
							{formik.errors.password}
						</p>
					)
				)}
				<button
					data-testid='submitButton'
					id='submit'
					className={styles.buttonsubmit}
					type='submit'
					disabled={formik.isSubmitting}
				>
					Register
				</button>
			</form>
		</div>
	);
};
