import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice.ts'
import authReducer from './slices/authSlice.ts'
import usersReducer from './slices/usersSlice.ts'
import messagesReducer from './slices/messagesSlice.ts'
import navbarReducer from './slices/navbarSlice.ts'
import appReducer from './slices/appSlice.ts'
import { authApi } from './services/authApi.ts'
import { profileApi } from './services/profileApi.ts'
import { usersApi } from './services/usersApi.ts'

const store = configureStore({
	reducer: {
		auth: authReducer,
		app: appReducer,
		navbar: navbarReducer,
		profilePage: profileReducer,
		messagesPage: messagesReducer,
		usersPage: usersReducer,
		[authApi.reducerPath]: authApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([authApi.middleware, profileApi.middleware, usersApi.middleware]),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
