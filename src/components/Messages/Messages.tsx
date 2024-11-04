import React from 'react'
import InterlocutorMessages from './InterlocutorMessages/InterlocutorMessages.tsx'
import Interlocutors from './Interlocutor/Interlocutors.tsx'
import { useParams } from 'react-router-dom'
import useRedirect from '../../helpers/hooks/useRedirect.tsx'

const Messages = () => {
	const { userId } = useParams()
	const redirect = useRedirect()

	return (
		redirect || (
			<div>
				{userId && <InterlocutorMessages messagesId={Number(userId)} />}
				{!userId && <Interlocutors />}
			</div>
		)
	)
}

export default Messages
