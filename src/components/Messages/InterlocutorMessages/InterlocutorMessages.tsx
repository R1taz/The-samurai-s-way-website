import React, { useRef } from 'react'
import style from './InterlocutorMessages.css'
import { NavLink } from 'react-router-dom'
import { sendMessage } from '../../../redux/slices/messagesSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/react-redux-hooks.ts'
import InterlocutorMessage from './InterlocutorMessage.tsx'

interface InterlocutorMessagesProps {
	messagesId: number
}

function InterlocutorMessages({ messagesId }: InterlocutorMessagesProps) {
	const interlocutorsMessages = useAppSelector(state => state.messagesPage.interlocutorsMessages)
	const userName = useAppSelector(state => state.auth.login)
	const dispatch = useAppDispatch()

	let messagesElem = interlocutorsMessages
		.filter(messages => messages.id === messagesId)
		.map(messages => <InterlocutorMessage key={messages.id} {...messages} />)

	const inputRef = useRef<HTMLInputElement | null>(null)

	const sendUserMessage = (): void => {
		if (!inputRef.current) return
		const newMessage = {
			id: messagesId,
			userName: userName as string,
			urlPhoto: 'https://forum.smotrarage.ru/data/avatars/l/0/1.jpg?1652301890',
			text: inputRef.current.value,
		}

		dispatch(sendMessage(newMessage))
		inputRef.current.value = ''
	}

	return (
		<div>
			<NavLink to={'/messages'} className={style.backBtn}>
				Назад
			</NavLink>
			{messagesElem}
			<div>
				<input type='text' ref={inputRef} className={style.sendMsg} />
				<button className={style.sendMsg} onClick={sendUserMessage}>
					Отправить сообщение
				</button>
			</div>
		</div>
	)
}

export default InterlocutorMessages
