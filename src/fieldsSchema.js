import * as yup from 'yup';

export const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.required('Поле почты не должно быть пустым')
		.matches(
			/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
			'Введите корректный почтовый адрес. Он должен содержать символ @. (Например, example@mail.ru)',
		),
	password: yup
		.string()
		.required('Поле пароля должно быть заполнено')
		.matches(
			/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
			'Используйте более надежный пароль. Пароль должен содержать хотя бы одну цифру, хотя бы один символ и буквы латинского алфавита в верхнем и нижнем регистре',
		)
		.min(6, 'Пароль должен содержать не меньше 6 символов')
		.max(20, 'Пароль не может содержать больше 20 символов'),
	passwordRepeat: yup
		.string()
		.required('Поле повтора пароля должно быть заполнено')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});
