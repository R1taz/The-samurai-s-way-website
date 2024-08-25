import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '../api/api.js'
import validateResponseLogin from '../validate/validateResponseLogin.js'
import { AuthorizedActionType, LoginDataType } from '../interfaces/index.js'

type AuthStateType = {
	isAuth: boolean
	id: null | number
	email: null | string
	login: null | string
	captchaUrl: null | string
}

const initialState: AuthStateType = {
	isAuth: false,
	id: null,
	email: null,
	login: null,
	captchaUrl: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCaptchaUrl(state, action: PayloadAction<{ url: string }>) {
			state.captchaUrl = action.payload.url
		},
	},
	extraReducers: builder => {
		builder
			.addCase(authorized.fulfilled, (state, action) => {
				state.isAuth = true
				state.captchaUrl = null
				state.id = action.payload.id
				state.login = action.payload.login
				state.email = action.payload.email
			})
			.addCase(logout.fulfilled, state => {
				state.isAuth = false
				state.id = null
				state.login = null
				state.email = null
			})
	},
})

export default authSlice.reducer

export const authorized = createAsyncThunk<AuthorizedActionType, undefined>(
	'auth/authorized',
	async (_, { rejectWithValue }) => {
		const response = await authAPI.authorized()
		if (response.resultCode !== 0) return rejectWithValue(null)
		const data = { ...response.data }
		return data
	}
)

export const login = createAsyncThunk<void, LoginDataType>(
	'auth/login',
	async (loginData, { rejectWithValue, dispatch }) => {
		const responseLogin = await authAPI.login(
			loginData.email,
			loginData.password,
			loginData.rememberMe,
			loginData.captcha
		)

		if (responseLogin.resultCode !== 0) {
			validateResponseLogin(responseLogin, responseLogin.resultCode, loginData.setErrors)
			if (responseLogin.resultCode === 10) {
				const responseCaptcha = await authAPI.captcha()
				dispatch(authSlice.actions.setCaptchaUrl(responseCaptcha))
			}
			return rejectWithValue(undefined)
		}

		dispatch(authorized())
	}
)

export const logout = createAsyncThunk<void, undefined>('auth/logout', async (_, { rejectWithValue }) => {
	const response = await authAPI.logout()
	if (response.resultCode !== 0) return rejectWithValue(undefined)
})
