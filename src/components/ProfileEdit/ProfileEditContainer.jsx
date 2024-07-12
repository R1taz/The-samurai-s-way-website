import { connect } from 'react-redux'
import {
	getUserProfile,
	updateProfile,
	updateUserPhoto,
} from '../../redux/profileReducer.ts'
import ProfileEdit from './ProfileEdit'
import { useEffect } from 'react'
import { getUserAuthorizedId } from '../../redux/selectors'

const ProfileEditContainer = props => {
	useEffect(() => {
		if (props.profile === null) props.getUserProfile(props.id)
	}, [])

	if (props.profile === null) return <div>loading</div>

	return <ProfileEdit {...props} />
}

const mapStateToProps = state => ({
	profile: state.profilePage.profile,
	id: getUserAuthorizedId(state),
})

export default connect(mapStateToProps, {
	updateProfile,
	updateUserPhoto,
	getUserProfile,
})(ProfileEditContainer)
