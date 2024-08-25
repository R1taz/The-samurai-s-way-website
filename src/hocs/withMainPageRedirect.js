import React from 'react'
import { Navigate } from 'react-router-dom'
import { getUserAuthorizedIsAuth } from '../redux/selectors'
import { useAppSelector } from '../hooks/react-redux-hooks.ts'

const withMainPageRedirect = Component => {
	const ComponentWithProfile = props => {
		const isAuth = useAppSelector(state => getUserAuthorizedIsAuth(state))
		if (!isAuth) return <Component {...props} />
		return <Navigate to='/profile' />
	}

	return ComponentWithProfile
}

export default withMainPageRedirect
