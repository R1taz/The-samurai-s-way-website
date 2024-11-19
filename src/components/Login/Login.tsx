import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import loginFormSchema from '../../validate/loginFormSchema.js'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/react-redux-hooks.ts'
import { useSetLoginDataMutation } from '../../redux/services/authApi.ts'
import { authorized } from '../../redux/slices/authSlice.ts'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {
	const navigate = useNavigate()
	const location = useLocation()
	const fromPage = location.state ? location.state.pathname : '/'

	const captchaUrl = useAppSelector(state => state.auth.captchaUrl)
	const dispatch = useAppDispatch()

	const [login] = useSetLoginDataMutation()

	return (
		<Formik
			initialValues={{ email: '', password: '', rememberMe: false, captcha: '', globalError: '' }}
			validationSchema={loginFormSchema}
			onSubmit={async (values, { setSubmitting, setErrors }) => {
				const data = await login({ values, setErrors }).unwrap()
				if (data) dispatch(authorized(data))
				navigate(fromPage, { replace: true })
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

export default Login
