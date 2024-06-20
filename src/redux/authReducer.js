import { authAPI } from '../api/api'
import validateResponseLogin from '../validate/validateResponseLogin'
import { initialized } from './appReducer'

const SET_USER_DATA = 'setUserData'
const DELETE_USER_DATA = 'deleteUserData'
const SET_CAPTCHA_URL = 'setCaptchaUrl'

const initialState = {
	isAuth: false,
	id: null,
	email: null,
	login: null,
	captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				id: action.id,
				login: action.login,
				email: action.email,
				isAuth: true,
				captchaUrl: null,
			}

		case DELETE_USER_DATA:
			return { ...state, isAuth: false, id: null, email: null, login: null }

		case SET_CAPTCHA_URL:
			return { ...state, captchaUrl: action.url }

		default:
			return state
	}
}

export default authReducer

const deleteUserData = () => ({ type: DELETE_USER_DATA })
const setUserData = (id, login, email) => ({
	type: SET_USER_DATA,
	id,
	login,
	email,
})
const setCaptchaUrl = url => ({ type: SET_CAPTCHA_URL, url })

export const authorized = () => {
	return async dispatch => {
		const response = await authAPI.authorized()
		if (response.resultCode !== 0) {
			dispatch(initialized())
			return
		}

		const { id, login, email } = { ...response.data }
		dispatch(setUserData(id, login, email))
		dispatch(initialized())
	}
}

export const login = (email, password, rememberMe, captcha, setErrors) => {
	return async dispatch => {
		const response = await authAPI.login(email, password, rememberMe, captcha)
		if (response.resultCode !== 0) {
			validateResponseLogin(response, response.resultCode, setErrors)
			if (response.resultCode === 10) {
				const responseCaptcha = await authAPI.captcha()
				dispatch(setCaptchaUrl(responseCaptcha.url))
			}
			return
		}
		dispatch(authorized())
	}
}

export const logout = () => {
	return async dispatch => {
		const response = await authAPI.logout()
		if (response.resultCode !== 0) return
		dispatch(deleteUserData())
	}
}
