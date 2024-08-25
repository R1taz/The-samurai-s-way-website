import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import loginFormSchema from '../../validate/loginFormSchema.js'
import withMainPageRedirect from '../../hocs/withMainPageRedirect.js'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks.ts'
import { login } from '../../redux/authSlice.ts'

function Login() {
	const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
	const dispatch = useAppDispatch()

	return (
		<Formik
			initialValues={{ email: '', password: '', rememberMe: false, captcha: '', globalError: '' }}
			validationSchema={loginFormSchema}
			onSubmit={(values, { setSubmitting, setErrors }) => {
				dispatch(login({ ...values, setErrors }))
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
						<Field type='password' name='password' placeholder='Введите пароль' />
						<ErrorMessage name='password' component='div' />
					</div>
					<div>
						<p>
							RememberMe
							<Field type='checkbox' name='rememberMe' />
						</p>
					</div>

					<div>
						<ErrorMessage name='globalError' component='div' />
					</div>

					{captchaUrl && (
						<div>
							<img src={captchaUrl} />
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
}

export default withMainPageRedirect(Login)
