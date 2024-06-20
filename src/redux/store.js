import { combineReducers, configureStore } from '@reduxjs/toolkit'
import profileReducer from './profileReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import messagesReducer from './messagesReducer'
import navbarReducer from './navbarReducer'
import appReducer from './appReducer'

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
