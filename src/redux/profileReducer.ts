import { profileAPI } from '../api/api.js'
import { deleteErrorDialogBox, setErrorDialogBox } from './appReducer.ts'
import { postsType, profileType, profilePhotosType } from '../types/types.ts'

const SET_USER_PROFILE = 'setUserProfile'
const SET_USER_STATUS = 'setUserStatus'
const SET_USER_PHOTO = 'setUserPhoto'
const UPDATE_USER_PROFILE = 'updateUserProfile'

const initialState = {
	posts: [
		{
			id: 1,
			userName: 'Bot 1',
			urlPhoto:
				'https://weblinks.ru/wp-content/uploads/2023/06/44-20220328_171045-768x768-1.jpg',
			text: 'message 1',
		},
		{
			id: 2,
			userName: 'Bot 2',
			urlPhoto:
				'https://pushinka.top/uploads/posts/2023-03/1680143395_pushinka-top-p-avatarka-ded-bobera-vkontakte-68.jpg',
			text: 'message 2',
		},
		{
			id: 3,
			userName: 'Bot 3',
			urlPhoto:
				'https://www.meme-arsenal.com/memes/2f5bee962a2f9e086cda4a4d4d784dec.jpg',
			text: 'message 3',
		},
	] as postsType[],
	profile: null as profileType | null,
	status: '',
}

export type initialStateType = typeof initialState

const profileReducer = (
	state = initialState,
	action: any
): initialStateType => {
	switch (action.type) {
		case SET_USER_PROFILE:
			return { ...state, profile: { ...action.profile } }

		case SET_USER_STATUS:
			return { ...state, status: action.status }

		case SET_USER_PHOTO:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as profileType,
			}

		case UPDATE_USER_PROFILE:
			return {
				...state,
				profile: {
					...action.profile,
					photos: { ...state.profile?.photos },
				},
			}

		default:
			return state
	}
}

export default profileReducer

type updateUserProfileType = {
	type: typeof UPDATE_USER_PROFILE
	profile: profileType
}
const updateUserProfile = (profile: profileType): updateUserProfileType => ({
	type: UPDATE_USER_PROFILE,
	profile,
})

type setUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: profileType
}
const setUserProfile = (profile: profileType): setUserProfileType => ({
	type: SET_USER_PROFILE,
	profile,
})

type setUserStatusType = {
	type: typeof SET_USER_STATUS
	status: string
}
const setUserStatus = (status: string): setUserStatusType => ({
	type: SET_USER_STATUS,
	status,
})

type setUserPhotoType = {
	type: typeof SET_USER_PHOTO
	photos: profilePhotosType
}
const setUserPhoto = (photos: profilePhotosType): setUserPhotoType => ({
	type: SET_USER_PHOTO,
	photos,
})

export const getUserProfile = (userId: number) => {
	return async (dispatch: any) => {
		const response = await profileAPI.getProfile(userId)
		dispatch(setUserProfile(response))
	}
}

export const getUserStatus = (userId: number) => {
	return async (dispatch: any) => {
		const response = await profileAPI.getStatus(userId)
		dispatch(setUserStatus(response))
	}
}

export const updateUserStatus = (status: string) => {
	return async (dispatch: any) => {
		try {
			const response = await profileAPI.updateStatus(status)
			if (response.resultCode !== 0) return
			dispatch(setUserStatus(status))
		} catch (error) {
			dispatch(setErrorDialogBox(error.response.status, error.message))
			setTimeout(() => dispatch(deleteErrorDialogBox()), 2000)
		}
	}
}

export const updateUserPhoto = (file: any) => {
	return async (dispatch: any) => {
		const response = await profileAPI.updatePhoto(file)
		if (response.resultCode !== 0) return
		dispatch(setUserPhoto(response.data.photos))
	}
}

export const updateProfile = (profile: profileType) => {
	return async (dispatch: any) => {
		const response = await profileAPI.updateProfile(profile)
		if (response.resultCode !== 0) return
		dispatch(updateUserProfile(profile))
	}
}
