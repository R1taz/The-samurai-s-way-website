import React from 'react'
import MessagesInterlocutor from './MessagesInterlocutor/MessagesInterlocutor'
import Interlocutor from './Interlocutor/Interlocutor'

function Messages(props) {
	return (
		<div>
			{props.messagesId && (
				<MessagesInterlocutor
					messagesInterlocutors={props.messagesInterlocutors}
					messagesId={props.messagesId}
					userName={props.userName}
					sendMessage={props.sendMessage}
				/>
			)}
			{!props.messagesId && <Interlocutor interlocutor={props.interlocutor} />}
		</div>
	)
}

export default Messages
