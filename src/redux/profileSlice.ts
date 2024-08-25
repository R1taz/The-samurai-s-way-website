import { profileAPI } from '../api/api.js'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setErrorDialogBox, deleteErrorDialogBox } from './appSlice.ts'
import { PhotosProfileType, PostType, ProfileType, ErrorDialogBoxType } from '../interfaces/index.ts'

type ProfileStateType = {
	posts: PostType[]
	profile: null | ProfileType
	status: string
}

const initialState: ProfileStateType = {
	posts: [
		{
			id: 1,
			userName: 'Bot 1',
			urlPhoto: 'https://weblinks.ru/wp-content/uploads/2023/06/44-20220328_171045-768x768-1.jpg',
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
			urlPhoto: 'https://www.meme-arsenal.com/memes/2f5bee962a2f9e086cda4a4d4d784dec.jpg',
			text: 'message 3',
		},
	],
	profile: null,
	status: '',
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.profile = { ...action.payload }
			})
			.addCase(getUserStatus.fulfilled, (state, action) => {
				state.status = action.payload
			})
			.addCase(updateUserStatus.fulfilled, (state, action) => {
				state.status = action.payload
			})
			.addCase(updateUserPhoto.fulfilled, (state, action) => {
				state.profile = { ...state.profile!, photos: action.payload }
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.profile = {
					...action.payload,
					photos: { ...state.profile!.photos },
				}
			})
	},
})

export default profileSlice.reducer

export const getUserProfile = createAsyncThunk<ProfileType, number>(
	'profile/getUserProfile',
	async userId => await profileAPI.getProfile(userId)
)

export const getUserStatus = createAsyncThunk<string, number>(
	'profile/getUserStatus',
	async userId => await profileAPI.getStatus(userId)
)

export const updateUserStatus = createAsyncThunk<string, string>(
	'profile/updateUserStatus',
	async (status, { dispatch, rejectWithValue }) => {
		try {
			const response = await profileAPI.updateStatus(status)
			if (response.resultCode !== 0) throw Error(response.messages[0])
			return status
		} catch (error) {
			const errorObject: Omit<ErrorDialogBoxType, 'title'> = {
				statusCode: '404',
				messageError: error.message,
			}

			dispatch(setErrorDialogBox(errorObject))
			await new Promise<void>(resolve => {
				setTimeout(() => {
					dispatch(deleteErrorDialogBox())
					resolve()
				}, 2000)
			})
			return rejectWithValue(null)
		}
	}
)

export const updateUserPhoto = createAsyncThunk<PhotosProfileType, Object>(
	'profile/updateUserPhoto',
	async (file, { rejectWithValue }) => {
		const response = await profileAPI.updatePhoto(file)
		if (response.resultCode !== 0) return rejectWithValue(null)
		return response.data.photos
	}
)

export const updateProfile = createAsyncThunk<ProfileType, ProfileType>(
	'profile/updateProfile',
	async (profile, { rejectWithValue }) => {
		const response = await profileAPI.updateProfile(profile)
		if (response.resultCode !== 0) return rejectWithValue(null)
		return profile
	}
)
