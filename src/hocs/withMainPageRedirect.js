import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getUserAuthorizedIsAuth } from '../redux/selectors'

const mstp = state => ({ isAuth: getUserAuthorizedIsAuth(state) })

function withMainPageRedirect(Component) {
	const ComponentWithProfile = props => {
		if (!props.isAuth) return <Component {...props} />
		return <Navigate to='/profile' />
	}

	return connect(mstp)(ComponentWithProfile)
}

export default withMainPageRedirect
