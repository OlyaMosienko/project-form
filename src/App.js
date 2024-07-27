import { useRef, useState } from 'react';
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

	const validateEmail = (value) => {
		if (!value.includes('@')) {
			return 'Введите корректный почтовый адрес. Он должен содержать символ @. (Например, example.mail.ru)';
		} else if (value.length === 0) {
			return 'Поле почты не должно быть пустым';
		}
		return null;
	};

	const validatePassword = (value) => {
		if (!value) {
			return 'Поле пароля должно быть заполнено';
		} else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
			return 'Используйте более надежный пароль. Пароль должен содержать хотя бы одну цифру, хотя бы один символ и буквы латинского алфавита в верхнем и нижнем регистре';
		} else if (value.length < 6 || value.length > 20) {
			return 'Пароль должен состоять из символов от 6 до 20';
		}
		return null;
	};

	const validatePasswordRepeat = (value) => {
		if (!value) {
			return 'Поле повтора пароля должно быть заполнено';
		} else if (value !== password) {
			return 'Введенный пароль не соответствует заданному выше. Попробуйте снова.';
		}
		return null;
	};

	const checkAllFields = () => {
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);
		const passwordRepeatError = validatePasswordRepeat(passwordRepeat);

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
			const repeatError = validatePasswordRepeat(newValue);
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
