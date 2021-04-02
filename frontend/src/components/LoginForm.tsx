import * as React from 'react';
import { useFormik } from 'formik';
import styles from './LoginForm.module.scss';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import { loginUser, UserErrors } from '../redux/user-slice';

type IProps = {
	closeModal: () => void;
};

interface LoginFormValues {
	email: string;
	password: string;
}

export const LoginForm = (props: IProps): JSX.Element => {
	const dispatch = useDispatch();
	const errors: UserErrors = useSelector((state: Store) => state.user.errors);

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
		onSubmit: async (values: LoginFormValues, { setSubmitting }) => {
			setSubmitting(true);
			await dispatch(loginUser(values));
			setSubmitting(false);
		},
		validationSchema: LoginSchema,
	});

	return (
		<div>
			<div className={styles.header}>
				<h1>Log In</h1>
				<button
					className={styles.closebutton}
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
					type='password'
					name='password'
					placeholder='password'
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				{errors.password ? (
					<p id='emailError' className={styles.error}>
						{errors.password}
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
					className={styles.buttonsubmit}
					type='submit'
					disabled={formik.isSubmitting}
				>
					Log In
				</button>
			</form>
		</div>
	);
};
