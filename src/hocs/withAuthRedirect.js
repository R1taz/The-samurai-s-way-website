import React from 'react'
import { Navigate } from 'react-router-dom'
import { getUserAuthorizedIsAuth } from '../redux/selectors'
import { useAppSelector } from '../hooks/react-redux-hooks.ts'

const withAuthRedirect = Component => {
	const ComponentWithAuth = props => {
		const isAuth = useAppSelector(state => getUserAuthorizedIsAuth(state))
		if (!isAuth) return <Navigate to='/login' />
		return <Component {...props} />
	}

	return ComponentWithAuth
}

export default withAuthRedirect
