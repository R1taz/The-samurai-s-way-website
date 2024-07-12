import { authAPI } from '../api/api.js'
import validateResponseLogin from '../validate/validateResponseLogin'
import { initialized } from './appReducer.ts'

const SET_USER_DATA = 'setUserData'
const DELETE_USER_DATA = 'deleteUserData'
const SET_CAPTCHA_URL = 'setCaptchaUrl'

const initialState = {
	isAuth: false,
	id: null as null | number,
	email: null as null | string,
	login: null as null | string,
	captchaUrl: null as null | string,
}

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: any): initialStateType => {
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

type deleteUserDataActionType = {
	type: typeof DELETE_USER_DATA
}
const deleteUserData = (): deleteUserDataActionType => ({
	type: DELETE_USER_DATA,
})

type setUserDataActionType = {
	type: typeof SET_USER_DATA
	id: number
	login: string
	email: string
}
const setUserData = (
	id: number,
	login: string,
	email: string
): setUserDataActionType => ({
	type: SET_USER_DATA,
	id,
	login,
	email,
})

type setCaptchaUrlActionType = {
	type: typeof SET_CAPTCHA_URL
	url: string
}
const setCaptchaUrl = (url: string): setCaptchaUrlActionType => ({
	type: SET_CAPTCHA_URL,
	url,
})

export const authorized = () => {
	return async (dispatch: any) => {
		const response = await authAPI.authorized()
		if (response.resultCode !== 0) {
			dispatch(initialized())
			return
		}

		const { id, login, email }: { id: number; login: string; email: string } = {
			...response.data,
		}
		dispatch(setUserData(id, login, email))
		dispatch(initialized())
	}
}

export const login = (
	email: string,
	password: string,
	rememberMe: string,
	captcha: string,
	setErrors: Function
) => {
	return async (dispatch: any) => {
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
	return async (dispatch: any) => {
		const response = await authAPI.logout()
		if (response.resultCode !== 0) return
		dispatch(deleteUserData())
	}
}
