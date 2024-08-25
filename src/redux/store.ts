import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './profileSlice.ts'
import authReducer from './authSlice.ts'
import usersReducer from './usersSlice.ts'
import messagesReducer from './messagesSlice.ts'
import navbarReducer from './navbarSlice.ts'
import appReducer from './appSlice.ts'

const store = configureStore({
	reducer: {
		auth: authReducer,
		app: appReducer,
		navbar: navbarReducer,
		profilePage: profileReducer,
		messagesPage: messagesReducer,
		usersPage: usersReducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
