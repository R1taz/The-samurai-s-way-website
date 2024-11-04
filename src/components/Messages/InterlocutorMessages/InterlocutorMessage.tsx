import React from 'react'
import style from './InterlocutorMessages.css'
import { IDataUserMessage } from '../../../interfaces'

const InterlocutorMessage = (props: IDataUserMessage) => {
	return (
		<div className={props.userName === props.userName ? style.userMessage : style.guestMessage}>
			<img src={props.urlPhoto} />
			<p className={style.messageName}>{props.userName}</p>
			<p className={style.messageText}>{props.text}</p>
		</div>
	)
}

export default InterlocutorMessage
