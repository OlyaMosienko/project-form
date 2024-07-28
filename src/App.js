import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { fieldsSchema } from './fieldsSchema';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const initialFormState = {
		email: '',
		password: '',
		passwordRepeat: '',
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'all',
		defaultValues: initialFormState,
		resolver: yupResolver(fieldsSchema),
	});

	const buttonSubmit = useRef(null);

	if (isValid) {
		buttonSubmit.current.focus();
	}

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={handleSubmit(sendFormData)}>
				<input
					className={styles.input}
					type="email"
					name="email"
					placeholder="Введите почту"
					{...register('email')}
				/>
				<input
					className={styles.input}
					type="password"
					name="password"
					placeholder="Введите пароль"
					{...register('password')}
				/>
				<input
					className={styles.input}
					type="password"
					name="passwordRepeat"
					placeholder="Повторите пароль"
					{...register('passwordRepeat')}
				/>
				<button
					className={styles.btn}
					type="submit"
					ref={buttonSubmit}
					disabled={!isValid}
				>
					Зарегистрироваться
				</button>
			</form>
			{errors && (
				<div className={styles.error}>
					{errors.email?.message ||
						errors.password?.message ||
						errors.passwordRepeat?.message}
				</div>
			)}
		</div>
	);
};
