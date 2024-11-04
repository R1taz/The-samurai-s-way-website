import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from './react-redux-hooks.ts'
import { getUserAuthorizedIsAuth } from '../../redux/selectors.js'

const useRedirect = () => {
	const location = useLocation()
	const isAuth = useAppSelector(state => getUserAuthorizedIsAuth(state))

	if (!isAuth) return <Navigate to='/login' state={location} />
	else return
}

export default useRedirect
