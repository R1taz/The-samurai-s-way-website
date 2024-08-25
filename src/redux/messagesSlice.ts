import userPhoto from '../assets/user.png'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InterlocutorType, MessagesInterlocutorType, SendMessageActionType } from '../interfaces'

type MessagesStateType = {
	interlocutor: InterlocutorType[]
	messagesInterlocutors: MessagesInterlocutorType[]
}

const initialState: MessagesStateType = {
	interlocutor: [
		{ id: 1, userName: 'User 1' },
		{ id: 2, userName: 'User 2' },
		{ id: 3, userName: 'User 3' },
	],
	messagesInterlocutors: [
		{
			id: 1,
			userName: 'Bot1',
			urlPhoto: userPhoto,
			text: 'message 1',
		},
		{
			id: 1,
			userName: 'Ritaz',
			urlPhoto: 'https://forum.smotrarage.ru/data/avatars/l/0/1.jpg?1652301890',
			text: 'message 2',
		},
		{
			id: 2,
			userName: 'Bot2',
			urlPhoto: userPhoto,
			text: 'message 3',
		},
		{
			id: 2,
			userName: 'Ritaz',
			urlPhoto: 'https://forum.smotrarage.ru/data/avatars/l/0/1.jpg?1652301890',
			text: 'message 4',
		},
		{
			id: 3,
			userName: 'Bot3',
			urlPhoto: userPhoto,
			text: 'message 5',
		},
		{
			id: 3,
			userName: 'Ritaz',
			urlPhoto: 'https://forum.smotrarage.ru/data/avatars/l/0/1.jpg?1652301890',
			text: 'message 6',
		},
	],
}

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		sendMessage(state, action: PayloadAction<SendMessageActionType>) {
			state.messagesInterlocutors.push({
				id: action.payload.id,
				userName: action.payload.userName,
				urlPhoto: action.payload.urlPhoto,
				text: action.payload.text,
			})
		},
	},
})

export default messagesSlice.reducer
export const { sendMessage } = messagesSlice.actions
