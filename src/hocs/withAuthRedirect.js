import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getUserAuthorizedIsAuth } from '../redux/selectors'

const mstp = state => ({ isAuth: getUserAuthorizedIsAuth(state) })

const withAuthRedirect = Component => {
	const ComponentWithAuth = props => {
		if (!props.isAuth) return <Navigate to='/login' />
		return <Component {...props} />
	}

	return connect(mstp)(ComponentWithAuth)
}

export default withAuthRedirect
