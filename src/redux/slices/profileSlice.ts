import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataUserMessage, IProfile, IProfilePhotos } from '../../interfaces'

interface State {
	posts: IDataUserMessage[]
	profile: IProfile | null
	status: string
}

const initialState: State = {
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
	reducers: {
		getUserProfile(state, action: PayloadAction<IProfile>) {
			state.profile = { ...action.payload }
		},
		getUserStatus(state, action: PayloadAction<string>) {
			state.status = action.payload
		},
		updateUserStatus(state, action: PayloadAction<string>) {
			state.status = action.payload
		},
		updateUserPhoto(state, action: PayloadAction<IProfilePhotos>) {
			state.profile = { ...state.profile!, photos: action.payload }
		},
		updateUserProfile(state, action: PayloadAction<Omit<IProfile, 'photos'>>) {
			state.profile = {
				...action.payload,
				photos: state.profile!.photos,
			}
		},
	},
})

export default profileSlice.reducer
export const { getUserProfile, getUserStatus, updateUserStatus, updateUserPhoto, updateUserProfile } =
	profileSlice.actions
