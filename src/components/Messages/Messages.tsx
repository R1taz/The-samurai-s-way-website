import React from 'react'
import MessagesInterlocutor from './MessagesInterlocutor/MessagesInterlocutor.tsx'
import Interlocutor from './Interlocutor/Interlocutor.tsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import withAuthRedirect from '../../hocs/withAuthRedirect'

interface Props {
	router: {
		params: {
			userId?: string
		}
	}
	isAuth: boolean
}

function Messages(props: Props) {
	let messagesId: null | number = null
	if (props.router.params.userId) messagesId = Number(props.router.params.userId)

	return (
		<div>
			{messagesId && <MessagesInterlocutor messagesId={messagesId} />}
			{!messagesId && <Interlocutor />}
		</div>
	)
}

export default withAuthRedirect(withRouter(Messages))

function withRouter(Component) {
	return props => {
		let location = useLocation()
		let params = useParams()
		let navigate = useNavigate()
		return <Component {...props} router={{ location, params, navigate }} />
	}
}
