import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx'
import Posts from './Posts/Posts.tsx'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/react-redux-hooks.ts'
import { useParams } from 'react-router-dom'
import { useGetProfileQuery } from '../../redux/services/profileApi.ts'
import { getUserProfile } from '../../redux/slices/profileSlice.ts'
import useRedirect from '../../helpers/hooks/useRedirect.tsx'

const Profile = () => {
	const { urlId } = useParams()

	const profile = useAppSelector(state => state.profilePage.profile)
	const profileId = useAppSelector(state => state.auth.id)
	const dispatch = useAppDispatch()

	const userId = urlId ? Number(urlId) : profileId!

	const { data: dataProfile } = useGetProfileQuery(userId)
	if (dataProfile && JSON.stringify(dataProfile) !== JSON.stringify(profile)) {
		dispatch(getUserProfile(dataProfile!))
	}

	const redirect = useRedirect()
	if (redirect) return redirect

	if (!profile) return <div>loading</div>

	return (
		<div>
			<ProfileInfo userId={userId} isOwner={!urlId} profile={profile} />
			<Posts />
		</div>
	)
}

export default Profile
