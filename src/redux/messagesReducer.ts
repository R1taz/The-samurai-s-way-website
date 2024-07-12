import userPhoto from '../assets/user.png'
import { interlocutorType, messagesInterlocutorsType } from '../types/types.ts'
const SEND_MESSAGE = 'sendMessage'

const initialState = {
	interlocutor: [
		{ id: 1, userName: 'User 1' },
		{ id: 2, userName: 'User 2' },
		{ id: 3, userName: 'User 3' },
	] as interlocutorType[],
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
	] as messagesInterlocutorsType[],
}

export type initialStateType = typeof initialState

const messagesReducer = (
	state = initialState,
	action: any
): initialStateType => {
	switch (action.type) {
		case SEND_MESSAGE:
			return {
				...state,
				messagesInterlocutors: [
					...state.messagesInterlocutors,
					{
						id: +action.id,
						userName: action.userName,
						urlPhoto: action.urlPhoto,
						text: action.text,
					},
				],
			}

		default:
			return state
	}
}

type sendMessageType = {
	type: typeof SEND_MESSAGE
	id: string
	userName: string
	urlPhoto: any
	text: string
}

export const sendMessage = (
	id: string,
	userName: string,
	urlPhoto: any,
	text: string
): sendMessageType => ({
	type: SEND_MESSAGE,
	id,
	userName,
	urlPhoto,
	text,
})

export default messagesReducer
