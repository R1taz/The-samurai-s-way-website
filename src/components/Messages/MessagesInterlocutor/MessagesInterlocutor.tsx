import React, { useRef } from 'react'
import style from './MessagesInterlocutor.module.css'
import { NavLink } from 'react-router-dom'
import { sendMessage } from '../../../redux/messagesSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux-hooks.ts'

interface Props {
	messagesId: number
}

function MessagesInterlocutor({ messagesId }: Props) {
	const messagesInterlocutors = useAppSelector(state => state.messagesPage.messagesInterlocutors)
	const userName = useAppSelector(state => state.auth.login)
	const dispatch = useAppDispatch()

	let messagesElem = messagesInterlocutors
		.filter(messages => messages.id === messagesId)
		.map(messages => (
			<div className={messages.userName === userName ? style.userMessage : style.guestMessage}>
				<img src={messages.urlPhoto} />
				<p className={style.messageName}>{messages.userName}</p>
				<p className={style.messageText}>{messages.text}</p>
			</div>
		))

	const inputRef = useRef<HTMLInputElement | null>(null)

	return (
		<div>
			<NavLink to={'/messages'} className={style.backBtn}>
				Назад
			</NavLink>
			{messagesElem}
			<div>
				<input type='text' ref={inputRef} className={style.sendMsg} />
				<button
					className={style.sendMsg}
					onClick={() => {
						if (!inputRef.current) return
						const newMessage = {
							id: messagesId,
							userName: userName as string,
							urlPhoto: 'https://forum.smotrarage.ru/data/avatars/l/0/1.jpg?1652301890',
							text: inputRef.current.value,
						}

						dispatch(sendMessage(newMessage))
						inputRef.current.value = ''
					}}
				>
					Отправить сообщение
				</button>
			</div>
		</div>
	)
}

export default MessagesInterlocutor
