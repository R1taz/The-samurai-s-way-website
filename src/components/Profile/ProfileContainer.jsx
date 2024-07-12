import { compose } from '@reduxjs/toolkit'
import Profile from './Profile'
import { connect } from 'react-redux'
import withAuthRedirect from '../../hocs/withAuthRedirect'
import {
	getUserProfile,
	getUserStatus,
	updateUserStatus,
} from '../../redux/profileReducer.ts'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPosts, getUserAuthorizedId } from '../../redux/selectors'

const ProfileContainer = props => {
	let userId = props.router.params.userId
	if (!userId) userId = props.id

	useEffect(() => {
		props.getUserProfile(userId)
		props.getUserStatus(userId)
	}, [userId])

	if (!props.profile) return <div>loading</div>

	return (
		<Profile
			posts={props.posts}
			isOwner={!props.router.params.userId}
			profile={props.profile}
			status={props.status}
			updateUserStatus={props.updateUserStatus}
		/>
	)
}

const mapStateToProps = state => {
	return {
		posts: getPosts(state),
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		id: getUserAuthorizedId(state),
	}
}

export default compose(
	connect(mapStateToProps, {
		getUserProfile,
		getUserStatus,
		updateUserStatus,
	}),
	withAuthRedirect,
	withRouter
)(ProfileContainer)

function withRouter(Component) {
	return props => {
		let location = useLocation()
		let params = useParams()
		let navigate = useNavigate()
		return <Component {...props} router={{ location, params, navigate }} />
	}
}
