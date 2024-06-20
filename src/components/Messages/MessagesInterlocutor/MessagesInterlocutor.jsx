import React from 'react'
import style from './MessagesInterlocutor.module.css'
import { NavLink } from 'react-router-dom'

function MessagesInterlocutor(props) {
	let messagesElem = props.messagesInterlocutors
		.filter(messages => messages.id === +props.messagesId)
		.map(messages => (
			<div
				className={
					messages.userName === props.userName
						? style.userMessage
						: style.guestMessage
				}
			>
				<img src={messages.urlPhoto} />
				<p className={style.messageName}>{messages.userName}</p>
				<p className={style.messageText}>{messages.text}</p>
			</div>
		))

	let refInput = React.createRef()

	return (
		<div>
			<NavLink to={'/messages'} className={style.backBtn}>
				Назад
			</NavLink>
			{messagesElem}
			<div>
				<input type='text' ref={refInput} className={style.sendMsg} />
				<button
					className={style.sendMsg}
					onClick={() => {
						props.sendMessage(
							props.messagesId,
							props.userName,
							'https://forum.smotrarage.ru/data/avatars/l/0/1.jpg?1652301890',
							refInput.current.value
						)
						refInput.current.value = ''
					}}
				>
					Отправить сообщение
				</button>
			</div>
		</div>
	)
}

export default MessagesInterlocutor
