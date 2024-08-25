import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authorized } from './authSlice.ts'
import { ErrorDialogBoxType } from '../interfaces/index.ts'

type AppStateType = {
	initialization: boolean
	errorDialogBox: ErrorDialogBoxType | null
}

const initialState: AppStateType = {
	initialization: false,
	errorDialogBox: null,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setErrorDialogBox(state, action: PayloadAction<Omit<ErrorDialogBoxType, 'title'>>) {
			state.errorDialogBox = {
				title: 'Произошла ошибка',
				messageError: action.payload.messageError + '.',
				statusCode: 'Status code: ' + action.payload.statusCode,
			}
		},
		deleteErrorDialogBox(state) {
			state.errorDialogBox = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(authorized.fulfilled, state => {
				state.initialization = true
			})
			.addCase(authorized.rejected, state => {
				state.initialization = true
			})
	},
})

export default appSlice.reducer
export const { setErrorDialogBox, deleteErrorDialogBox } = appSlice.actions
