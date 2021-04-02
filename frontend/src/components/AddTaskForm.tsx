import * as React from 'react';
import { useFormik } from 'formik';
import styles from './AddTaskForm.module.scss';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import { addTask } from '../redux/task-slice';

type IProps = {
	closeModal: () => void;
};

interface AddTaskFormValues {
	taskname: string;
	taskdesc: string;
	taskdue: string;
}

export const AddTaskForm = ({closeModal}: IProps): JSX.Element => {
	const dispatch = useDispatch();
	const userName = useSelector((state: Store) => state.user.userName);

	const getValues = (taskToAdd: AddTaskFormValues) => {
		const taskduedate = taskToAdd.taskdue;
		return {
			...taskToAdd,
			taskduedate,
			taskcreator: userName,
		};
	};

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
		onSubmit: async (values: AddTaskFormValues, { setSubmitting }) => {
			setSubmitting(true);
			const taskToAdd = getValues(values);
			await dispatch(addTask(taskToAdd));
			setSubmitting(false);
			closeModal();
		},
		validationSchema: AddTaskSchema,
	});
	return (
		<div>
			<div className={styles.header}>
				<h1>Create Task</h1>
				<button
					className={styles.closebutton}
					onClick={closeModal}
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
				<textarea
					className={styles.textarea}
					name='taskdesc'
					placeholder='Task Description'
					onChange={formik.handleChange}
					value={formik.values.taskdesc}
				/>
				<input
					className={styles.input}
					type='datetime-local'
					name='taskdue'
					placeholder='Task Due Date & Time'
					onChange={formik.handleChange}
					value={formik.values.taskdue}
				/>
				<button
					data-testid='submitButton'
					id='submit'
					className={styles.buttonsubmit}
					type='submit'
					disabled={formik.isSubmitting}
				>
					Add
				</button>
			</form>
		</div>
	);
};
