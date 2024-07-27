import * as yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const emailChangeSchema = yup
	.string()
	.required('Поле почты не должно быть пустым')
	.matches(
		/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
		'Введите корректный почтовый адрес. Он должен содержать символ @. (Например, example@mail.ru)',
	);

const passwordChangeSchema = yup
	.string()
	.required('Поле пароля должно быть заполнено')
	.matches(
		/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
		'Используйте более надежный пароль. Пароль должен содержать хотя бы одну цифру, хотя бы один символ и буквы латинского алфавита в верхнем и нижнем регистре',
	)
	.min(6, 'Пароль должен содержать не меньше 6 символов')
	.max(20, 'Пароль не может содержать больше 20 символов');

const passwordRepeatChangeSchema = yup
	.string()
	.required('Поле повтора пароля должно быть заполнено')
	.oneOf([yup.ref('password')], 'Пароли не совпадают');

const validateAndGetErrorMessage = (schema, value) => {
	let errorMessage = null;

	try {
		schema.validateSync(value);
	} catch ({ errors }) {
		errorMessage = errors.join('\n');
	}

	return errorMessage;
};

export const App = () => {
	const initialFormState = {
		email: '',
		password: '',
		passwordRepeat: '',
	};
	const [formData, setFormData] = useState(initialFormState);
	const [error, setError] = useState(null);
	const buttonSubmit = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		if (checkAllFields()) {
			sendFormData(formData);
			setFormData(initialFormState);
			setError(null);
		}
	};

	const { email, password, passwordRepeat } = formData;

	const isDisabledButton =
		!!error || email === '' || password === '' || passwordRepeat === '';

	const checkAllFields = () => {
		const emailError = validateAndGetErrorMessage(emailChangeSchema, email);
		const passwordError = validateAndGetErrorMessage(passwordChangeSchema, password);
		const passwordRepeatError = validateAndGetErrorMessage(
			passwordRepeatChangeSchema,
			passwordRepeat,
		);

		if (emailError || passwordError || passwordRepeatError) {
			setError(emailError || passwordError || passwordRepeatError);
			return false;
		}

		setError(null);
		return true;
	};

	const handleInputChange = (field, event) => {
		const newValue = event.target.value;
		setFormData({ ...formData, [field]: newValue });

		if (field === 'passwordRepeat') {
			const repeatError = validateAndGetErrorMessage(
				passwordRepeatChangeSchema,
				newValue,
			);
			setError(repeatError);
		} else {
			checkAllFields();
			buttonSubmit.current.focus();
		}
	};

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					className={styles.input}
					type="email"
					name="email"
					value={email}
					placeholder="Введите почту"
					onChange={(event) => handleInputChange('email', event)}
				/>
				<input
					className={styles.input}
					type="password"
					name="password"
					value={password}
					placeholder="Введите пароль"
					onChange={(event) => handleInputChange('password', event)}
				/>
				<input
					className={styles.input}
					type="password"
					name="passwordRepeat"
					value={passwordRepeat}
					placeholder="Повторите пароль"
					onChange={(event) => handleInputChange('passwordRepeat', event)}
				/>
				<button
					className={styles.btn}
					ref={buttonSubmit}
					type="submit"
					disabled={isDisabledButton}
				>
					Зарегистрироваться
				</button>
			</form>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
};
