import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import loginFormSchema from '../../../validate/loginFormSchema'

function Login(props) {
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				remember: false,
				captcha: '',
				globalError: '',
			}}
			validationSchema={loginFormSchema}
			onSubmit={(values, { setSubmitting, setErrors }) => {
				props.login(
					values.email,
					values.password,
					values.remember,
					values.captcha,
					setErrors
				)
				setSubmitting(false)
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<div>
						<Field name='email' placeholder='Введите логин' />
						<ErrorMessage name='email' component='div' />
					</div>

					<div>
						<Field
							type='password'
							name='password'
							placeholder='Введите пароль'
						/>
						<ErrorMessage name='password' component='div' />
					</div>
					<div>
						<p>
							RememberMe
							<Field type='checkbox' name='remember' />
						</p>
					</div>

					<div>
						<ErrorMessage name='globalError' component='div' />
					</div>

					{props.captchaUrl && (
						<div>
							<img src={props.captchaUrl} />
							<Field name='captcha' />
						</div>
					)}

					<button type='submit' disabled={isSubmitting}>
						Войти
					</button>
				</Form>
			)}
		</Formik>
	)

	/* let loginText = React.createRef()
	let passwordText = React.createRef()

	return (
		<div>
			<input ref={loginText} type='text' placeholder='Введите логин' />
			<input ref={passwordText} type='password' placeholder='Введите пароль' />
			<button
				type='button'
				onClick={() =>
					props.login(loginText.current.value, passwordText.current.value)
				}
			>
				Войти
			</button>
		</div>
	) */
}

export default Login
