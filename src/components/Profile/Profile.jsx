import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './Posts/Posts'

function Profile(props) {
	return (
		<div>
			<ProfileInfo
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
			/>
			<Posts posts={props.posts} />
		</div>
	)
}

export default Profile
