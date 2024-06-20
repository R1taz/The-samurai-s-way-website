import * as Yup from 'yup'

export default Yup.object().shape({
	email: Yup.string()
		.min(3, 'Слишком короткий логин')
		.max(20, 'Слишком длинный логин')
		.required('Поле должно быть заполнено обязательно'),
	password: Yup.string()
		.min(8, 'Слишком короткий пароль')
		.required('Поле должно быть заполнено обязательно'),
})
