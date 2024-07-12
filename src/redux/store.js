import { combineReducers, configureStore } from '@reduxjs/toolkit'
import profileReducer from './profileReducer.ts'
import authReducer from './authReducer.ts'
import usersReducer from './usersReducer.ts'
import messagesReducer from './messagesReducer.ts'
import navbarReducer from './navbarReducer.ts'
import appReducer from './appReducer.ts'

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	navbar: navbarReducer,
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	usersPage: usersReducer,
})

const store = configureStore({ reducer: rootReducer })

window.store = store

export default store
