import { createSlice } from '@reduxjs/toolkit'

interface State {
	initialization: boolean
}

const initialState: State = {
	initialization: false,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		initialized(state) {
			state.initialization = true
		},
	},
})

export default appSlice.reducer
export const { initialized } = appSlice.actions
