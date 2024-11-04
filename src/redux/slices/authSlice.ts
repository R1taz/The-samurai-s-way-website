import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserData } from '../../interfaces'

interface State {
	isAuth: boolean
	id: number | null
	email: string | null
	login: string | null
	captchaUrl: string | null
}

const initialState: State = {
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
		setCaptchaUrl(state, action: PayloadAction<string>) {
			state.captchaUrl = action.payload
		},
		authorized(state, action: PayloadAction<IUserData>) {
			state.isAuth = true
			state.captchaUrl = null
			state.id = action.payload.id
			state.login = action.payload.login
			state.email = action.payload.email
		},
		logout(state) {
			state.isAuth = false
			state.id = null
			state.login = null
			state.email = null
		},
	},
})

export default authSlice.reducer
export const { authorized, setCaptchaUrl, logout } = authSlice.actions
