import React from 'react'
import { useAppSelector } from './react-redux-hooks.ts'
import { getUserAuthorizedIsAuth } from '../redux/selectors'
import { Navigate } from 'react-router-dom'

export const useAuthRedirect = () => {
	debugger
	const isAuth = useAppSelector(state => getUserAuthorizedIsAuth(state))
	if (!isAuth) return <Navigate to='/login' />
}
