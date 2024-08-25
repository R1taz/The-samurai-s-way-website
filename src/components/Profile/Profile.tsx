import React, { useEffect, useMemo } from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx'
import Posts from './Posts/Posts.tsx'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks.ts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import withAuthRedirect from '../../hocs/withAuthRedirect'
import { getUserProfile, getUserStatus } from '../../redux/profileSlice.ts'
import { useAuthRedirect } from '../../hooks/useAuthRedirect.tsx'

interface Props {
	router: {
		params: {
			userId?: string
		}
	}
	isAuth: boolean
}

function Profile(props: Props) {
	const profile = useAppSelector(state => state.profilePage.profile)
	const id = useAppSelector(state => state.auth.id)
	const dispatch = useAppDispatch()

	let userId = id!
	if (props.router.params.userId) userId = Number(props.router.params.userId)

	useEffect(() => {
		dispatch(getUserProfile(userId))
		dispatch(getUserStatus(userId))
	}, [userId, dispatch])

	if (!profile) return <div>loading</div>

	return (
		<div>
			<ProfileInfo isOwner={!props.router.params.userId} profile={profile} />
			<Posts />
		</div>
	)
}

export default withAuthRedirect(withRouter(Profile))

function withRouter(Component) {
	return props => {
		let location = useLocation()
		let params = useParams()
		let navigate = useNavigate()
		return <Component {...props} router={{ location, params, navigate }} />
	}
}
